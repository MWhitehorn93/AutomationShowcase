import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

const registerUserName = 'TestUser';
const registerUserEmail = `testuser_${Date.now()}@gmail.com`;

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Register Before Checkout', async ({ homePage, loginPage, registerPage, allProductsPage, cartPage, page }) => {

    await homePage.homeLoginButton.click();
    await page.waitForURL(/\/login$/);
    await loginPage.registerUser(registerUserName, registerUserEmail);
    await registerPage.fillRegistrationForm(testData.registerUser);
    await registerPage.submitForm();
    await expect(registerPage.accountCreatedMessage).toBeVisible();
    await registerPage.continueButton.click();
    await expect(homePage.loggedInAsUser).toBeVisible();
    await homePage.navigateToAllProducts();
    await allProductsPage.addProductToCartByIndex(0);
    await homePage.navigateToCart();
    await cartPage.proceedToCheckoutButton.click();
    await page.waitForURL(/\/checkout$/);
    await cartPage.assertDeliveryAddress(
        testData.registerUser.containerSelector,
        testData.registerUser.address1,
        testData.registerUser.address2,
        testData.registerUser.city,
        testData.registerUser.state,
        testData.registerUser.zipcode,
        testData.registerUser.country
    );
    await cartPage.assertBillingAddress(
        testData.registerUser.containerSelector,
        testData.registerUser.address1,
        testData.registerUser.address2,
        testData.registerUser.city,
        testData.registerUser.state,
        testData.registerUser.zipcode,
        testData.registerUser.country
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
    await registerPage.deleteAccount();
});