import { test } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Verify subscription functionality on cart page', async ({ homePage, cartPage }) => {

    await homePage.navigateToCart();
    await cartPage.subscribeToNewsletter(testData.emailSubscription.email);
});