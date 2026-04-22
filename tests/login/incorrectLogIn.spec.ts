import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Incorrect Log In Attempt', async ({ homePage, loginPage, page }) => {
    await homePage.homeLoginButton.click();
    await page.waitForURL(/\/login$/);
    await loginPage.loginUser(testData.incorrectUser.email, testData.incorrectUser.password);
    await expect(loginPage.loginErrorMessage).toBeVisible();
});