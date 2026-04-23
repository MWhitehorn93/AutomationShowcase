import { test } from '../../../fixtures';
import testData from '../../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Test Case 10: Verify subscription in homepage', async ({ homePage }) => {
    await homePage.subscribeToNewsletter(testData.emailSubscription.email);
});

test('Test Case 11: Verify subscription in cart page', async ({ homePage, cartPage }) => {
    await homePage.navigateToCart();
    await cartPage.subscribeToNewsletter(testData.emailSubscription.email);
});