import { expect, test } from "@playwright/test";

test("Homepage displays welcome message", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Welcome to the home page!" })).toBeVisible();
});

test("Homepage displays 'Recent Posts' heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Recent Posts/i })).toBeVisible();
});

test("Homepage has navigation bar with Home link", async ({ page }) => {
    await page.goto("/");
    const homeLink = page.getByRole("link", { name: "Home" });
    await expect(homeLink).toBeVisible();
});

test("Homepage has navigation bar with Communities link", async ({ page }) => {
    await page.goto("/");
    const communitiesLink = page.getByRole("link", { name: "Communities" });
    await expect(communitiesLink).toBeVisible();
});

test("Homepage displays 'Hello anonymous!' when not logged in", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Hello anonymous!")).toBeVisible();
});
