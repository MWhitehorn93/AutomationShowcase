import { test } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Verify subscription functionality on homepage', async ({ homePage }) => {
    
    await homePage.subscribeToNewsletter(testData.emailSubscription.email);
});
