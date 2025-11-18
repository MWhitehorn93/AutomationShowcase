import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
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
    await allProductsPage.singleSearchProduct(testData.SingleProduct.productName);
    await allProductsPage.assertProductSearch(testData.SingleProduct.productName, testData.SingleProduct.price);
});