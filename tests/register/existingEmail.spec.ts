import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { RegisterUserPage } from '../../pages/registerUserPage';
import { LoginPage } from '../../pages/loginPage';
import testData from '../../data/testData.json';

const registerUserName = 'TestUser';

test.beforeEach(async ({ page }) => {
const homePage = new HomePage(page);

  await homePage.visit();
});


test('Register User and Delete user', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterUserPage(page);
  
  await homePage.homeLoginButton.click();
  await page.waitForURL(/\/login$/);
  await loginPage.registerUser(registerUserName, testData.loginUser.email);
  await expect(loginPage.existingEmailErrorMessage).toBeVisible();
});