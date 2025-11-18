import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TestCase } from '../../pages/testCasesPage';

test.beforeEach(async ({ page }) => {
const homePage = new HomePage(page);


  await homePage.visit();
});

test('Verify Test Case Example', async ({ page }) => {
    const homePage = new HomePage(page);
    const testCasePage = new TestCase(page);

    await homePage.navigateToTestCase();
    await expect(page).toHaveURL(/\/test_cases$/);
    await expect(testCasePage.testCaseTitle).toBeVisible();
});
