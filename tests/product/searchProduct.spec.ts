import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { AllProductsPage } from '../../pages/allProductsPage';
import testData from '../../data/testData.json';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Single Search Product', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);

    await homePage.navigateToAllProducts();
    await allProductsPage.singleSearchProduct(testData.singleProduct.productName);
    await allProductsPage.assertProductSearch(testData.singleProduct.productName, testData.singleProduct.price);
});