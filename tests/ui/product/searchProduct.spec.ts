import { test } from '../../../fixtures';
import testData from '../../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Single Search Product', async ({ homePage, allProductsPage }) => {

    await homePage.navigateToAllProducts();
    await allProductsPage.singleSearchProduct(testData.singleProduct.productName);
    await allProductsPage.assertProductSearch(testData.singleProduct.productName, testData.singleProduct.price);
});