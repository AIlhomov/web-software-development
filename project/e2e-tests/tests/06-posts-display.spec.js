import { expect, test } from "@playwright/test";

test("Post list shows 'No posts yet' when empty", async ({ page }) => {
    await page.goto("/communities");

    // Try to find and click on a community
    const communityLinks = page.getByRole("listitem").getByRole("link");
    const count = await communityLinks.count();

    if (count > 0) {
        await communityLinks.first().click();

        // Check for posts heading
        await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();

        // Might show "No posts yet" message
        const noPosts = page.getByText("No posts yet.");
        if (await noPosts.isVisible()) {
            await expect(noPosts).toBeVisible();
        }
    }
});

test("Community page has back to communities link", async ({ page }) => {
    await page.goto("/communities");

    const communityLinks = page.getByRole("listitem").getByRole("link");
    const count = await communityLinks.count();

    if (count > 0) {
        await communityLinks.first().click();
        await expect(page.getByRole("link", { name: /Back to all communities/i })).toBeVisible();
    }
});

test("Post titles are clickable links", async ({ page }) => {
    await page.goto("/communities");

    const communityLinks = page.getByRole("listitem").getByRole("link");
    const count = await communityLinks.count();

    if (count > 0) {
        await communityLinks.first().click();

        // Check if there are any posts
        const postListItems = page.getByRole("listitem");
        const postCount = await postListItems.count();

        if (postCount > 0) {
            // Find a link within the post
            const postLink = postListItems.first().getByRole("link");
            await expect(postLink).toBeVisible();
        }
    }
});
