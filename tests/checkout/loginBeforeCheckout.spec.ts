import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Login Before Checkout', async ({ homePage, loginPage, allProductsPage, cartPage, page }) => {

    await homePage.homeLoginButton.click();
    await page.waitForURL(/\/login$/);
    await loginPage.loginUser(testData.loginUser.email, testData.loginUser.password);
    await expect(homePage.getLoggedInAsText(testData.loginUser.userName)).toBeVisible();
    await homePage.navigateToAllProducts();
    await allProductsPage.addProductToCartByIndex(0);
    await homePage.navigateToCart();
    await cartPage.proceedToCheckoutButton.click();
    await page.waitForURL(/\/checkout$/);
    await cartPage.assertDeliveryAddress(
       testData.loginUser.containerSelector,
       testData.loginUser.address1,
       testData.loginUser.address2,
       testData.loginUser.city,
       testData.loginUser.state,
       testData.loginUser.zipcode,
       testData.loginUser.country
        );
    await cartPage.assertBillingAddress(
         testData.loginUser.containerSelector,
            testData.loginUser.address1,
            testData.loginUser.address2,
            testData.loginUser.city,
            testData.loginUser.state,
            testData.loginUser.zipcode,
            testData.loginUser.country
    );
    await cartPage.placeOrderButton.click();
    await cartPage.enterPaymentDetailsAndPay(
        testData.cardDetails.nameOnCard,
        testData.cardDetails.cardNumber,
        testData.cardDetails.cvc,
        testData.cardDetails.expirationMonth,
        testData.cardDetails.expirationYear);
    await cartPage.assertOrderPlaced();
    await cartPage.downloadInvoiceButton.click();
})