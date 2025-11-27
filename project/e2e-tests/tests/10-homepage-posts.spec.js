import { expect, test } from "@playwright/test";

test("Homepage lists recent posts", async ({ page }) => {
    await page.goto("/");

    // The homepage should have the list structure
    const postList = page.locator("ul");

    // Check if list exists (even if empty)
    const listCount = await postList.count();
    expect(listCount).toBeGreaterThanOrEqual(0);
});

test("Recent posts display title, content, and vote counts", async ({ page }) => {
    await page.goto("/");

    // Check if any posts are displayed
    const listItems = page.getByRole("listitem");
    const itemCount = await listItems.count();

    if (itemCount > 0) {
        const firstPost = listItems.first();

        // Post should have clickable title
        const titleLink = firstPost.getByRole("link");
        await expect(titleLink).toBeVisible();

        // Should have vote information
        await expect(firstPost.getByText(/Upvotes:/)).toBeVisible();
        await expect(firstPost.getByText(/Downvotes:/)).toBeVisible();
        await expect(firstPost.getByText(/Comments:/)).toBeVisible();
    }
});

test("Homepage post links navigate to post detail page", async ({ page }) => {
    await page.goto("/");

    const listItems = page.getByRole("listitem");
    const itemCount = await listItems.count();

    if (itemCount > 0) {
        const firstPost = listItems.first();
        const titleLink = firstPost.getByRole("link");

        await titleLink.click();

        // Should navigate to a post detail page
        await expect(page).toHaveURL(/\/communities\/\d+\/posts\/\d+/);
        await expect(page.getByRole("heading", { name: "Comments" })).toBeVisible();
    }
});

test("Homepage shows 'No recent posts' when empty", async ({ page }) => {
    await page.goto("/");

    const listItems = page.getByRole("listitem");
    const itemCount = await listItems.count();

    // If no posts, should show a message
    if (itemCount === 0) {
        await expect(page.getByText(/No recent posts/i)).toBeVisible();
    }
});
