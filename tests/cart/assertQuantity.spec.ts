import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AllProductsPage } from '../../pages/allProductsPage';
import { CartPage } from '../../pages/CartPage';
import { ProductDetailPage } from '../../pages/productPage';
import  testData  from '../../data/testData.json';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Add first two products to cart and verify', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);
    const cartPage = new CartPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await homePage.navigateToAllProducts();

    await allProductsPage.singleSearchProduct(testData.singleProduct.productName);
    await allProductsPage.viewProductButton.click();
    await productDetailPage.assertProductDetails(
        testData.singleProduct.productName,
        testData.singleProduct.category,
        testData.singleProduct.price,
        testData.singleProduct.availability,
        testData.singleProduct.condition,
        testData.singleProduct.brand
    );
    await page.pause();

});
