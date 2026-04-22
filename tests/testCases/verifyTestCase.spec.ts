import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.beforeEach(async ({ page }) => {
const homePage = new HomePage(page);


  await homePage.visit();
});

test('Verify Test Case Example', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToTestCase();
    await expect(page).toHaveURL(/\/test_cases$/);
    await expect(page.locator('b')).toHaveText('Test Cases');
});
