import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { AllProductsPage } from '../../pages/allProductsPage';
import { LoginPage } from '../../pages/loginPage';
import { CartPage } from '../../pages/cartPage';
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
    await cartPage.assertProductsInCart(testData.singleProduct.productName);
    await homePage.homeLoginButton.click();
    await loginPage.loginUser(testData.loginUser.email, testData.loginUser.password);
    await homePage.navigateToCart();
    await cartPage.assertProductsInCart(testData.singleProduct.productName);
});