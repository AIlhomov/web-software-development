import { expect, test } from "@playwright/test";

const testUser = {
    email: `test-comment-${Date.now()}@example.com`,
    password: "password123"
};

test.describe("Comment functionality", () => {
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

    test("Post page displays comments heading", async ({ page }) => {
        await page.goto("/communities");
        
        const communityLinks = page.getByRole("listitem").getByRole("link");
        const count = await communityLinks.count();
        
        if (count > 0) {
            await communityLinks.first().click();
            
            // Click on a post if available
            const postLinks = page.getByRole("listitem").getByRole("link");
            const postCount = await postLinks.count();
            
            if (postCount > 0) {
                await postLinks.first().click();
                await expect(page.getByRole("heading", { name: "Comments" })).toBeVisible();
            }
        }
    });

    test("Post page has back to community link", async ({ page }) => {
        await page.goto("/communities");
        
        const communityLinks = page.getByRole("listitem").getByRole("link");
        const count = await communityLinks.count();
        
        if (count > 0) {
            await communityLinks.first().click();
            
            const postLinks = page.getByRole("listitem").getByRole("link");
            const postCount = await postLinks.count();
            
            if (postCount > 0) {
                await postLinks.first().click();
                await expect(page.getByRole("link", { name: /Back to community/i })).toBeVisible();
            }
        }
    });

    test("Authenticated user can see comment form", async ({ page }) => {
        await page.goto("/communities");
        
        const communityLinks = page.getByRole("listitem").getByRole("link");
        const count = await communityLinks.count();
        
        if (count > 0) {
            await communityLinks.first().click();
            
            const postLinks = page.getByRole("listitem").getByRole("link");
            const postCount = await postLinks.count();
            
            if (postCount > 0) {
                await postLinks.first().click();
                
                // Check for comment form
                const addCommentHeading = page.getByRole("heading", { name: "Add Comment" });
                const commentButton = page.getByRole("button", { name: "Add comment" });
                
                await expect(addCommentHeading).toBeVisible();
                await expect(commentButton).toBeVisible();
            }
        }
    });

    test("Comment form has content textarea", async ({ page }) => {
        await page.goto("/communities");
        
        const communityLinks = page.getByRole("listitem").getByRole("link");
        const count = await communityLinks.count();
        
        if (count > 0) {
            await communityLinks.first().click();
            
            const postLinks = page.getByRole("listitem").getByRole("link");
            const postCount = await postLinks.count();
            
            if (postCount > 0) {
                await postLinks.first().click();
                
                const commentInput = page.getByPlaceholder(/comment/i);
                await expect(commentInput).toBeVisible();
            }
        }
    });
});
