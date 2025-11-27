import { expect, test } from "@playwright/test";

const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: "password123"
};

test.describe("Community creation flow", () => {
    test.beforeEach(async ({ page }) => {
        // Register and login
        await page.goto("/auth/register");
        await page.getByLabel("Email").fill(testUser.email);
        await page.getByLabel("Password").fill(testUser.password);
        await page.getByRole("button", { name: "Register" }).click();

        // Wait for redirect and then login
        await page.waitForURL(/.*\/auth\/login/);
        await page.getByLabel("Email").fill(testUser.email);
        await page.getByLabel("Password").fill(testUser.password);
        await page.getByRole("button", { name: "Login" }).click();

        // Wait for successful login
        await page.waitForURL("/");
    });

    test("Authenticated user can see community form", async ({ page }) => {
        await page.goto("/communities");
        await expect(page.getByRole("heading", { name: "Add New Community" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Add community" })).toBeVisible();
    });

    test("Community form has name input field", async ({ page }) => {
        await page.goto("/communities");
        const nameInput = page.getByPlaceholder(/community name/i);
        await expect(nameInput).toBeVisible();
    });

    test("Community form has description textarea", async ({ page }) => {
        await page.goto("/communities");
        const descriptionInput = page.getByPlaceholder(/community description/i);
        await expect(descriptionInput).toBeVisible();
    });

    test("User can create a new community", async ({ page }) => {
        await page.goto("/communities");

        const communityName = `Test Community ${Date.now()}`;
        const communityDescription = "This is a test community";

        await page.getByPlaceholder(/community name/i).fill(communityName);
        await page.getByPlaceholder(/community description/i).fill(communityDescription);
        await page.getByRole("button", { name: "Add community" }).click();

        // Wait a bit for the community to be created
        await page.waitForTimeout(1000);

        // Check that the community appears in the list
        await expect(page.getByText(communityName)).toBeVisible();
    });
});
