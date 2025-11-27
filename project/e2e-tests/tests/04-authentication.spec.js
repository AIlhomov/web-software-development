import { expect, test } from "@playwright/test";

test("Register page has email input field", async ({ page }) => {
    await page.goto("/auth/register");
    const emailInput = page.getByLabel("Email");
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("type", "email");
});

test("Register page has password input field", async ({ page }) => {
    await page.goto("/auth/register");
    const passwordInput = page.getByLabel("Password");
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute("type", "password");
});

test("Register page has register button", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(page.getByRole("button", { name: "Register" })).toBeVisible();
});

test("Register page has link to login page", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(page.getByRole("link", { name: /Login here/i })).toBeVisible();
});

test("Login page has email input field", async ({ page }) => {
    await page.goto("/auth/login");
    const emailInput = page.getByLabel("Email");
    await expect(emailInput).toBeVisible();
});

test("Login page has password input field", async ({ page }) => {
    await page.goto("/auth/login");
    const passwordInput = page.getByLabel("Password");
    await expect(passwordInput).toBeVisible();
});

test("Login page has login button", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

test("Login page has link to register page", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.getByRole("link", { name: /Register here/i })).toBeVisible();
});
