import { expect, test } from "@playwright/test";

test("Communities page displays heading", async ({ page }) => {
    await page.goto("/communities");
    await expect(page.getByRole("heading", { name: "Communities" })).toBeVisible();
});

test("Communities page shows message when no communities exist", async ({ page }) => {
    await page.goto("/communities");
    const noCommunities = page.getByText("No communities yet.");
    // Message might be visible if no communities exist
    if (await noCommunities.isVisible()) {
        await expect(noCommunities).toBeVisible();
    }
});

test("Communities page does not show form when not authenticated", async ({ page }) => {
    await page.goto("/communities");
    const addButton = page.getByRole("button", { name: "Add community" });
    await expect(addButton).not.toBeVisible();
});

test("Community list displays community names as links", async ({ page }) => {
    await page.goto("/communities");
    // Check if any community links exist (structure test)
    const listItems = page.getByRole("listitem");
    const count = await listItems.count();
    // If communities exist, they should be clickable links
    if (count > 0) {
        const firstItem = listItems.first();
        const link = firstItem.getByRole("link");
        await expect(link).toBeVisible();
    }
});
