import { test, expect } from '../../fixtures';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Assert product categories', async ({ homePage }) => {
    
    await expect(homePage.womenCategoryButton).toBeVisible();
    await homePage.womenCategoryButton.click();
    await expect(homePage.womenDressCategoryButton).toBeVisible();
    await homePage.womenDressCategoryButton.click();
    await expect(homePage.womenDressCategoryHeader).toBeVisible();
    await homePage.mensCategoryButton.click();
    await homePage.menJeansCategoryButton.click();
    await expect(homePage.meanJeansHeader).toBeVisible();
});

test('Assert brands', async ({ homePage, allProductsPage }) => {

    await homePage.poloBrandButton.click();
    await expect(allProductsPage.poloBrandHeader).toBeVisible();
    await homePage.mastAndHarborBrandButton.click();
    await expect(allProductsPage.mastAndHarborBrandHeader).toBeVisible();
});