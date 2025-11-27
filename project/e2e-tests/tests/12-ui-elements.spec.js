import { expect, test } from "@playwright/test";

test("Navigation bar is visible on all pages", async ({ page }) => {
    const pages = ["/", "/communities", "/auth/login", "/auth/register"];
    
    for (const pagePath of pages) {
        await page.goto(pagePath);
        await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
        await expect(page.getByRole("link", { name: "Communities" })).toBeVisible();
    }
});

test("Page structure is consistent across routes", async ({ page }) => {
    await page.goto("/");
    
    // Check for header element
    const header = page.locator("header");
    await expect(header).toBeVisible();
    
    // Check for main element
    const main = page.locator("main");
    await expect(main).toBeVisible();
});

test("Form buttons are properly labeled", async ({ page }) => {
    await page.goto("/auth/login");
    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toHaveAttribute("type", "submit");
    
    await page.goto("/auth/register");
    const registerButton = page.getByRole("button", { name: "Register" });
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toHaveAttribute("type", "submit");
});

test("Required form fields are marked as required", async ({ page }) => {
    await page.goto("/auth/login");
    
    const emailInput = page.getByLabel("Email");
    await expect(emailInput).toHaveAttribute("required");
    
    const passwordInput = page.getByLabel("Password");
    await expect(passwordInput).toHaveAttribute("required");
});

test("Email fields have correct input type", async ({ page }) => {
    await page.goto("/auth/login");
    const emailInput = page.getByLabel("Email");
    await expect(emailInput).toHaveAttribute("type", "email");
    
    await page.goto("/auth/register");
    const emailInput2 = page.getByLabel("Email");
    await expect(emailInput2).toHaveAttribute("type", "email");
});
