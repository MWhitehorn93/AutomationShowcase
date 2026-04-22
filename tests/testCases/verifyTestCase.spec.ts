import { test, expect } from '../../fixtures';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Verify Test Case Example', async ({ homePage, page }) => {

    await homePage.navigateToTestCase();
    await expect(page).toHaveURL(/\/test_cases$/);
    await expect(page.locator('b')).toHaveText('Test Cases');
});
