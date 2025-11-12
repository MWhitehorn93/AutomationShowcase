import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/loginPage';
import testData from '../../data/testData.json';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Log in and Log out User', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.homeLoginButton.click();
    await page.waitForURL(/\/login$/);
    await loginPage.loginUser(testData.loginUser.email, testData.loginUser.password);
    await expect(homePage.testUserLoggedInMessage).toBeVisible();
    await homePage.homeLogOutButton.click();
});