import { test, expect } from '../../fixtures';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Test Case 7: Verify Test Case Example', async ({ homePage, page }) => {
    await homePage.navigateToTestCase();
    await expect(page).toHaveURL(/\/test_cases$/);
    await expect(page.locator('b')).toHaveText('Test Cases');
});


test('Test Case 18: View Category products', async ({ homePage }) => {
    await expect(homePage.womenCategoryButton).toBeVisible();
    await homePage.womenCategoryButton.click();
    await expect(homePage.womenDressCategoryButton).toBeVisible();
    await homePage.womenDressCategoryButton.click();
    await expect(homePage.womenDressCategoryHeader).toBeVisible();
    await homePage.mensCategoryButton.click();
    await homePage.menJeansCategoryButton.click();
    await expect(homePage.meanJeansHeader).toBeVisible();
});


test('Test Case 19: View & Cart Brand Products', async ({ homePage, allProductsPage }) => {
    await homePage.poloBrandButton.click();
    await expect(allProductsPage.poloBrandHeader).toBeVisible();
    await homePage.mastAndHarborBrandButton.click();
    await expect(allProductsPage.mastAndHarborBrandHeader).toBeVisible();
});
