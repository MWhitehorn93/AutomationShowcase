import { test, expect } from '../../../fixtures/fixtures';
import testData from '../../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToAllProducts();
});

test('Test Case 8: Verify All Products and product detail page', async ({ homePage, allProductsPage, productPage }) => {
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


});

test('Test Case 9: Search Product', async ({ homePage, allProductsPage }) => {
    await homePage.navigateToAllProducts();
    await allProductsPage.singleSearchProduct(testData.singleProduct.productName);
    await allProductsPage.assertProductSearch(testData.singleProduct.productName, testData.singleProduct.price);
});

test('Test Case 21: Add review on Product', async ({ homePage, allProductsPage, productPage }) => {
    await homePage.navigateToAllProducts();
    await allProductsPage.navigateToFirstProduct();
    await productPage.writeReview(
        testData.review.name,
        testData.review.email,
        testData.review.reviewText
    );
});