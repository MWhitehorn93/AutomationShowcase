import { test, expect } from '../../../fixtures/fixtures';
import testData from '../../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('All Products and first product page', async ({ homePage, allProductsPage, productPage }) => {

    await homePage.navigateToAllProducts();
    await allProductsPage.assertAllProducts();
    await allProductsPage.navigateToFirstProduct();

    const uiFirstProductDetails = await productPage.getFirstProductDetails();

    await expect(uiFirstProductDetails.name).toBe(testData.firstProduct.productName);
    await expect(uiFirstProductDetails.category).toBe(testData.firstProduct.category);
    await expect(uiFirstProductDetails.price).toBe(testData.firstProduct.price);
    await expect(uiFirstProductDetails.availability).toBe(testData.firstProduct.availability);
    await expect(uiFirstProductDetails.condition).toBe(testData.firstProduct.condition);
    await expect(uiFirstProductDetails.brand).toBe(testData.firstProduct.brand);


})