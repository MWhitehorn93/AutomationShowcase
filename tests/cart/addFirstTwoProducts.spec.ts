import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Add first two products to cart and verify', async ({ homePage, allProductsPage, cartPage }) => {

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