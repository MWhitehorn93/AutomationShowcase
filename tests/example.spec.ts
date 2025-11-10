import { test, expect } from '@playwright/test';

test('Go to test', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  await page.pause();
  await expect(page).toHaveTitle(/Example/);
});
