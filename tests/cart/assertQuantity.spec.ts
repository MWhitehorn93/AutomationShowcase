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

test('Add first two products to cart and verify', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);
    const cartPage = new CartPage(page);
    const productDetailPage = new ProductDetailPage(page);

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
    //await page.pause();

    await expect(cartPage.cartDescription).toContainText(testData.singleProduct.productName);
    await expect(cartPage.cartDescription).toContainText(testData.singleProduct.category);
    await expect(cartPage.cartQuantity).toHaveText(testData.singleProduct.quantity.toString());
    const cartPrice1 = await cartPage.getCartTotalPriceByIndex(0);
    await expect(cartPrice1).toBe(testData.singleProduct.totalPrice);
});
