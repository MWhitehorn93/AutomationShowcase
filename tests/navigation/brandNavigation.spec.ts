import { test, expect } from '@playwright/test';
import { AllProductsPage } from '../../pages/allProductsPage';
import { HomePage } from '../../pages/homePage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Navigate to brands', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);

    await homePage.poloBrandButton.click();
    await expect(allProductsPage.poloBrandHeader).toBeVisible();
    await homePage.mastAndHarborBrandButton.click();
    await expect(allProductsPage.mastAndHarborBrandHeader).toBeVisible();
});