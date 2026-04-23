import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Test Case 12: Add Products in Cart', async ({ homePage, allProductsPage, cartPage }) => {
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

test('Test Case 13: Verify Product quantity in cart', async ({ homePage, allProductsPage, cartPage, productPage }) => {
    const productDetailPage = productPage;
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
    await productDetailPage.setQuantity(testData.singleProduct.quantity);
    await productDetailPage.addToCartButton.click();
    await allProductsPage.viewCartButton.click();
    await expect(cartPage.cartDescription).toContainText(testData.singleProduct.productName);
    await expect(cartPage.cartDescription).toContainText(testData.singleProduct.category);
    await expect(cartPage.cartQuantity).toHaveText(testData.singleProduct.quantity.toString());
    const cartPrice1 = await cartPage.getCartTotalPriceByIndex(0);
    await expect(cartPrice1).toBe(testData.singleProduct.totalPrice);
});

test('Test Case 17: Remove Products from Cart', async ({ homePage, allProductsPage, cartPage }) => {
    await homePage.navigateToAllProducts();
    await allProductsPage.addProductToCartByIndex(0);
    await allProductsPage.addProductToCartByIndex(1);
    await allProductsPage.addProductToCartByIndex(2);
    await homePage.cartButton.click();
    await cartPage.assertProductsInCart(testData.firstProduct.productName);
    await cartPage.removeFirstProductButton.click();
    await cartPage.assertProductsNotInCart(testData.firstProduct.productName);
});

test('Test Case 20: Search Products and Verify Cart after Login', async ({ homePage, allProductsPage, loginPage, cartPage, productPage }) => {
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

test('Test Case 22: Add to cart from Recommended Items', async ({ homePage, cartPage }) => {
    await homePage.recommendedItemsHeader.scrollIntoViewIfNeeded();
    const recommendedItem = await homePage.getRecommendedItemDetailsByIndex(0);
    await homePage.addRecommendedItemToCartByIndex(0);
    await homePage.navigateToCart();
    const cartProductName = await cartPage.getCartProductNameByIndex(0);
    const cartProductPrice = await cartPage.getCartProductPriceByIndex(0);
    expect(cartProductName).toBe(recommendedItem.name);
    expect(cartProductPrice).toBe(recommendedItem.price);
});