import { expect, test } from "@playwright/test";

const testUser = {
    email: `test-post-${Date.now()}@example.com`,
    password: "password123"
};

test.describe("Post creation flow", () => {
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

        // Create a community to post in
        await page.goto("/communities");
        const communityName = `Test Community ${Date.now()}`;
        await page.getByPlaceholder(/community name/i).fill(communityName);
        await page.getByPlaceholder(/community description/i).fill("Test description");
        await page.getByRole("button", { name: "Add community" }).click();

        await page.waitForTimeout(1000);

        // Navigate to the community
        await page.getByText(communityName).click();
    });

    test("Authenticated user can see post form", async ({ page }) => {
        await expect(page.getByRole("heading", { name: "Create New Post" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Add post" })).toBeVisible();
    });

    test("Post form has title input", async ({ page }) => {
        const titleInput = page.getByPlaceholder(/post title/i);
        await expect(titleInput).toBeVisible();
    });

    test("Post form has content textarea", async ({ page }) => {
        const contentInput = page.getByPlaceholder(/post content/i);
        await expect(contentInput).toBeVisible();
    });

    test("User can create a new post", async ({ page }) => {
        const postTitle = `Test Post ${Date.now()}`;
        const postContent = "This is test post content";

        await page.getByPlaceholder(/post title/i).fill(postTitle);
        await page.getByPlaceholder(/post content/i).fill(postContent);
        await page.getByRole("button", { name: "Add post" }).click();

        await page.waitForTimeout(1000);

        // Verify post appears in the list
        await expect(page.getByText(postTitle)).toBeVisible();
    });
});
