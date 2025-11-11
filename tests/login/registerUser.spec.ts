import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

const registerUserName = 'TestUser';
const registerUserEmail = `testuser_${Date.now()}@gmail.com`;


test.beforeEach(async ({ page }) => {
const homePage = new HomePage(page);

  await homePage.visit();
});


test('Register User', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.homeLoginButton.click();
  await page.waitForURL(/\/login$/);
  await page.pause();
  await homePage.registerUser(registerUserName, registerUserEmail);
});