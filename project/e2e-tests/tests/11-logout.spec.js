import { expect, test } from "@playwright/test";

const testUser = {
    email: `test-logout-${Date.now()}@example.com`,
    password: "password123"
};

test.describe("Logout functionality", () => {
    test("User can logout after logging in", async ({ page }) => {
        // Register
        await page.goto("/auth/register");
        await page.getByLabel("Email").fill(testUser.email);
        await page.getByLabel("Password").fill(testUser.password);
        await page.getByRole("button", { name: "Register" }).click();
        
        // Login
        await page.waitForURL(/.*\/auth\/login/);
        await page.getByLabel("Email").fill(testUser.email);
        await page.getByLabel("Password").fill(testUser.password);
        await page.getByRole("button", { name: "Login" }).click();
        
        await page.waitForURL("/");
        
        // Verify logged in
        await expect(page.getByText(`Hello, ${testUser.email}!`)).toBeVisible();
        
        // Logout
        await page.getByRole("button", { name: "Logout" }).click();
        
        // Verify logged out
        await expect(page.getByText("Hello anonymous!")).toBeVisible();
        await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
    });

    test("After logout, user cannot access authenticated features", async ({ page }) => {
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
        
        // Logout
        await page.getByRole("button", { name: "Logout" }).click();
        
        // Try to access communities page
        await page.goto("/communities");
        
        // Community form should not be visible
        const addCommunityButton = page.getByRole("button", { name: "Add community" });
        await expect(addCommunityButton).not.toBeVisible();
    });
});
