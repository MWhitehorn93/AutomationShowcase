import { test, expect } from '../../../fixtures';
import testData from '../../../data/testData.json';

const registerUserName = 'TestUser';
const registerUserEmail = `testuser_${Date.now()}@gmail.com`;

test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToLoginPage();
});

test('Test Case 1: Register User', async ({ loginPage, registerPage}) => {
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

test('Test Case 5: Register User with existing email', async ({ loginPage }) => {
  await loginPage.registerUser(registerUserName, testData.loginUser.email);
  await expect(loginPage.existingEmailErrorMessage).toBeVisible();
});