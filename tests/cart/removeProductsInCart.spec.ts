import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Remove all products from cart and verify cart is empty', async ({ homePage, allProductsPage, cartPage }) => {

    await homePage.navigateToAllProducts();
    await allProductsPage.addProductToCartByIndex(0);
    await allProductsPage.addProductToCartByIndex(1);
    await allProductsPage.addProductToCartByIndex(2);
    await homePage.cartButton.click();
    await cartPage.assertProductsInCart(testData.firstProduct.productName);
    await cartPage.removeFirstProductButton.click();
    await cartPage.assertProductsNotInCart(testData.firstProduct.productName);
})