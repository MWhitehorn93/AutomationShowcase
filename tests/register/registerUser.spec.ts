import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

const registerUserName = 'TestUser';
const registerUserEmail = `testuser_${Date.now()}@gmail.com`;


test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});


test('Register User and Delete user', async ({ homePage, loginPage, registerPage, page }) => {
  
  await homePage.homeLoginButton.click();
  await page.waitForURL(/\/login$/);
  await loginPage.registerUser(registerUserName, registerUserEmail);
  await registerPage.fillRegistrationForm(testData.registerUser);
  await registerPage.submitForm();
  await expect(registerPage.accountCreatedMessage).toBeVisible();
  await registerPage.continueButton.click();
  await expect(registerPage.loggedInAsUser).toBeVisible();
  await registerPage.deleteAccountButton.click();
  await expect(registerPage.deleteAccountConfirmationMessage).toBeVisible();
  await registerPage.continueButton.click();
});