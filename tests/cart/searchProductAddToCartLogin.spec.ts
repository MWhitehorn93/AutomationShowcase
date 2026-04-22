import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Search for a product, add to cart before login, and verify', async ({ homePage, allProductsPage, loginPage, cartPage, productPage, page }) => {

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