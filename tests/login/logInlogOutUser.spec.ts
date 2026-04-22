import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Log in and Log out User', async ({ homePage, loginPage, page }) => {

    await homePage.homeLoginButton.click();
    await page.waitForURL(/\/login$/);
    await loginPage.loginUser(testData.loginUser.email, testData.loginUser.password);
    await expect(homePage.getLoggedInAsText(testData.loginUser.userName)).toBeVisible();
    await homePage.homeLogOutButton.click();
});