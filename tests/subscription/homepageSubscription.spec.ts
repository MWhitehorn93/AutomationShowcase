import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import testData from '../../data/testData.json';

test.beforeEach(async ({ page }) => {
const homePage = new HomePage(page);

  await homePage.visit();
});

test('Verify subscription functionality on homepage', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.subscribeToNewsletter(testData.homePageSubscription.email);
});
