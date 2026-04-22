import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/loginPage';
import testData from '../../data/testData.json';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Incorrect Log In Attempt', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
   
    await homePage.homeLoginButton.click();
    await page.waitForURL(/\/login$/);
    await loginPage.loginUser(testData.incorrectUser.email, testData.incorrectUser.password);
    await expect(loginPage.loginErrorMessage).toBeVisible();
});