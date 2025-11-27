import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AllProductsPage } from '../../pages/allProductsPage';
import { CartPage } from '../../pages/CartPage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Add first two products to cart and verify', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToAllProducts();

    const firstProductPrice = await allProductsPage.getProductPriceByIndex(0);
    const secondProductPrice = await allProductsPage.getProductPriceByIndex(1);

    await allProductsPage.addProductToCartByIndex(0);
    await allProductsPage.addProductToCartByIndex(1);

    await homePage.cartButton.click();
    
    const cartPrice1 = await cartPage.getCartProductPriceByIndex(0);
    const cartPrice2 = await cartPage.getCartProductPriceByIndex(1);

    expect(cartPrice1).toBe(firstProductPrice);
    expect(cartPrice2).toBe(secondProductPrice);
});