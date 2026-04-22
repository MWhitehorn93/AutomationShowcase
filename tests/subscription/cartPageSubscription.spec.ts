import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { CartPage } from '../../pages/cartPage';
import testData from '../../data/testData.json';

test.beforeEach(async ({ page }) => {
const homePage = new HomePage(page);

  await homePage.visit();
});

test('Verify subscription functionality on homepage', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToCart();
    await cartPage.subscribeToNewsletter(testData.emailSubscription.email);
});