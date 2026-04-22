import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Add recommended items to cart and verify', async ({ homePage, allProductsPage, cartPage, productPage }) => {

    await homePage.recommendedItemsHeader.scrollIntoViewIfNeeded();

    const recommendedItem = await homePage.getRecommendedItemDetailsByIndex(0);

    await homePage.addRecommendedItemToCartByIndex(0);
    await homePage.navigateToCart();

    const cartProductName = await cartPage.getCartProductNameByIndex(0);
    const cartProductPrice = await cartPage.getCartProductPriceByIndex(0);
    expect(cartProductName).toBe(recommendedItem.name);
    expect(cartProductPrice).toBe(recommendedItem.price);
});
