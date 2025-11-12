import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { RegisterUserPage } from '../../pages/registerUserPage';
import testData from '../../data/testData.json';

const registerUserName = 'TestUser';
const registerUserEmail = `testuser_${Date.now()}@gmail.com`;


test.beforeEach(async ({ page }) => {
const homePage = new HomePage(page);

  await homePage.visit();
});


test('Register User and Delete user', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterUserPage(page);
  await homePage.homeLoginButton.click();
  await page.waitForURL(/\/login$/);
  await homePage.registerUser(registerUserName, registerUserEmail);
  await registerPage.fillRegistrationForm(testData.user);
  await registerPage.submitForm();
  await expect(registerPage.accountCreatedMessage).toBeVisible();
  await registerPage.continueButton.click();
  await expect(registerPage.loggedInAsUser).toBeVisible();
  await registerPage.deleteAccountButton.click();
  await expect(registerPage.deleteAccountConfirmationMessage).toBeVisible();
  await registerPage.continueButton.click();
});