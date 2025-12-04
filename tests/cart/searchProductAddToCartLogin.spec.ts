import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AllProductsPage } from '../../pages/allProductsPage';
import { LoginPage } from '../../pages/LoginPage';
import { CartPage } from '../../pages/CartPage';
import { ProductDetailPage } from '../../pages/productPage';
import testData from '../../data/testData.json';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Search for a product, add to cart before login, and verify', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductDetailPage(page);

    await homePage.navigateToAllProducts();
    await allProductsPage.singleSearchProduct(testData.singleProduct.productName);
    await allProductsPage.navigateToFirstProduct();
    await productPage.addToCartButton.click();
    await productPage.viewCartButton.click();
    await page.pause();



})