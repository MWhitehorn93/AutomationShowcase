import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Navigate to product category', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await expect(homePage.womenCategoryButton).toBeVisible();
    await homePage.womenCategoryButton.click();
    await expect(homePage.womenDressCategoryButton).toBeVisible();
    await homePage.womenDressCategoryButton.click();
    await expect(homePage.womenDressCategoryHeader).toBeVisible();
    await homePage.mensCategoryButton.click();
    await homePage.menJeansCategoryButton.click();
    await expect(homePage.meanJeansHeader).toBeVisible();
});