import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToLoginPage();
});

test('Test Case 2: Log in User with correct email and password ', async ({ homePage, loginPage, page }) => {
    await loginPage.loginUser(testData.loginUser.email, testData.loginUser.password);
    await expect(homePage.getLoggedInAsText(testData.loginUser.userName)).toBeVisible();
    await homePage.homeLogOutButton.click();
});

test('Test Case 3: Log in User with incorrect email and password', async ({ homePage, loginPage, page }) => {
    await homePage.navigateToLoginPage();
    await loginPage.loginUser(testData.incorrectUser.email, testData.incorrectUser.password);
    await expect(loginPage.loginErrorMessage).toBeVisible();
});