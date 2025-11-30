import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AllProductsPage } from '../../pages/allProductsPage';
import { CartPage } from '../../pages/CartPage';
import  testData  from '../../data/testData.json';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Remove all products from cart and verify cart is empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToAllProducts();
    await allProductsPage.addProductToCartByIndex(0);
    await allProductsPage.addProductToCartByIndex(1);
    await allProductsPage.addProductToCartByIndex(2);
    await homePage.cartButton.click();
    await cartPage.assertProductsInCart(testData.firstProduct.productName, testData.firstProduct.category);
    await cartPage.removeFirstProductButton.click();
    await cartPage.assertProductsNotInCart(testData.firstProduct.productName, testData.firstProduct.category);
})