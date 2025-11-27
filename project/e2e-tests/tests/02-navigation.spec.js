import { expect, test } from "@playwright/test";

test("Navigation from homepage to communities page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Communities" }).click();
    await expect(page).toHaveURL(/.*\/communities/);
    await expect(page.getByRole("heading", { name: "Communities" })).toBeVisible();
});

test("Navigation from communities back to home", async ({ page }) => {
    await page.goto("/communities");
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Welcome to the home page!" })).toBeVisible();
});

test("Login link navigates to login page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Login" }).click();
    await expect(page).toHaveURL(/.*\/auth\/login/);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});

test("Register link navigates to register page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Register" }).click();
    await expect(page).toHaveURL(/.*\/auth\/register/);
    await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();
});
