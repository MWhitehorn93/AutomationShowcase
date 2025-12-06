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

test('Add recommended items to cart and verify', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);
    const cartPage = new CartPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await homePage.recommendedItemsHeader.scrollIntoViewIfNeeded();

    const recommendedItem = await homePage.getRecommendedItemDetailsByIndex(0);

    await homePage.addRecommendedItemToCartByIndex(0);
    await homePage.navigateToCart();

    const cartProductName = await cartPage.getCartProductNameByIndex(0);
    const cartProductPrice = await cartPage.getCartProductPriceByIndex(0);
    expect(cartProductName).toBe(recommendedItem.name);
    expect(cartProductPrice).toBe(recommendedItem.price);
});
