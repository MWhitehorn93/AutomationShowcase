import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Add first two products to cart and verify', async ({ homePage, allProductsPage, cartPage, productPage }) => {
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
