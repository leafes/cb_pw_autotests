import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("Authorization", async ({ page }) => {
  await page.goto("https://f.crossball.ru/");
  await page.goto("https://f.crossball.ru/auth");
  await page.getByRole("button", { name: "Вход" }).click();

  await expect(page.getByRole('heading', { name: 'Финансы' })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
