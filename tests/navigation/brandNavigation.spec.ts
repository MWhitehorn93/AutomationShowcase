import { test, expect } from '../../fixtures';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Navigate to brands', async ({ homePage, allProductsPage }) => {

    await homePage.poloBrandButton.click();
    await expect(allProductsPage.poloBrandHeader).toBeVisible();
    await homePage.mastAndHarborBrandButton.click();
    await expect(allProductsPage.mastAndHarborBrandHeader).toBeVisible();
});