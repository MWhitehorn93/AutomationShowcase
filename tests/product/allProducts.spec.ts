import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AllProductsPage } from '../../pages/allProductsPage';
import testData from '../../data/testData.json';
import { ProductDetailPage } from '../../pages/productPage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('All Products and first product page', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);

    await homePage.navigateToAllProducts();
    await allProductsPage.assertAllProducts();
    await allProductsPage.navigateToFirstProduct();

    const uiFirstProductDetails = await ProductDetailPage.prototype.getFirstProductDetails.call({ page });

    await expect(uiFirstProductDetails.name).toBe(testData.firstProduct.productName);
    await expect(uiFirstProductDetails.category).toBe(testData.firstProduct.category);
    await expect(uiFirstProductDetails.price).toBe(testData.firstProduct.price);
    await expect(uiFirstProductDetails.availability).toBe(testData.firstProduct.availability);
    await expect(uiFirstProductDetails.condition).toBe(testData.firstProduct.condition);
    await expect(uiFirstProductDetails.brand).toBe(testData.firstProduct.brand);


})