import { test, expect } from '../../fixtures';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Navigate to product category', async ({ homePage }) => {
    
    await expect(homePage.womenCategoryButton).toBeVisible();
    await homePage.womenCategoryButton.click();
    await expect(homePage.womenDressCategoryButton).toBeVisible();
    await homePage.womenDressCategoryButton.click();
    await expect(homePage.womenDressCategoryHeader).toBeVisible();
    await homePage.mensCategoryButton.click();
    await homePage.menJeansCategoryButton.click();
    await expect(homePage.meanJeansHeader).toBeVisible();
});