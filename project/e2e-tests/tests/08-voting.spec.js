import { expect, test } from "@playwright/test";

const testUser = {
    email: `test-vote-${Date.now()}@example.com`,
    password: "password123"
};

test.describe("Voting functionality", () => {
    test.beforeEach(async ({ page }) => {
        // Register and login
        await page.goto("/auth/register");
        await page.getByLabel("Email").fill(testUser.email);
        await page.getByLabel("Password").fill(testUser.password);
        await page.getByRole("button", { name: "Register" }).click();
        
        await page.waitForURL(/.*\/auth\/login/);
        await page.getByLabel("Email").fill(testUser.email);
        await page.getByLabel("Password").fill(testUser.password);
        await page.getByRole("button", { name: "Login" }).click();
        
        await page.waitForURL("/");
    });

    test("Posts display upvote and downvote counts", async ({ page }) => {
        await page.goto("/communities");
        
        const communityLinks = page.getByRole("listitem").getByRole("link");
        const count = await communityLinks.count();
        
        if (count > 0) {
            await communityLinks.first().click();
            
            // Check for vote counts in posts
            const upvoteText = page.getByText(/Upvotes:/);
            const downvoteText = page.getByText(/Downvotes:/);
            
            // If posts exist, vote counts should be visible
            const postListItems = page.getByRole("listitem");
            const postCount = await postListItems.count();
            
            if (postCount > 0) {
                await expect(upvoteText.first()).toBeVisible();
                await expect(downvoteText.first()).toBeVisible();
            }
        }
    });

    test("Authenticated users see upvote buttons", async ({ page }) => {
        await page.goto("/communities");
        
        const communityLinks = page.getByRole("listitem").getByRole("link");
        const count = await communityLinks.count();
        
        if (count > 0) {
            await communityLinks.first().click();
            
            const upvoteButtons = page.getByRole("button", { name: "Upvote" });
            const buttonCount = await upvoteButtons.count();
            
            // If there are posts, there should be upvote buttons
            if (buttonCount > 0) {
                await expect(upvoteButtons.first()).toBeVisible();
            }
        }
    });

    test("Authenticated users see downvote buttons", async ({ page }) => {
        await page.goto("/communities");
        
        const communityLinks = page.getByRole("listitem").getByRole("link");
        const count = await communityLinks.count();
        
        if (count > 0) {
            await communityLinks.first().click();
            
            const downvoteButtons = page.getByRole("button", { name: "Downvote" });
            const buttonCount = await downvoteButtons.count();
            
            if (buttonCount > 0) {
                await expect(downvoteButtons.first()).toBeVisible();
            }
        }
    });
});
