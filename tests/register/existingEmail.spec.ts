import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

const registerUserName = 'TestUser';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});


test('Register User and Delete user', async ({ homePage, loginPage, page }) => {
  
  await homePage.homeLoginButton.click();
  await page.waitForURL(/\/login$/);
  await loginPage.registerUser(registerUserName, testData.loginUser.email);
  await expect(loginPage.existingEmailErrorMessage).toBeVisible();
});