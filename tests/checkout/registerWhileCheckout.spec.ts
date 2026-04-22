import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

const registerUserName = 'TestUser';
const registerUserEmail = `testuser_${Date.now()}@gmail.com`;

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Register While Checkout', async ({ homePage, registerPage, loginPage, allProductsPage, cartPage, page }) => {
    const registerUserPage = registerPage;

    await homePage.navigateToAllProducts();
    await allProductsPage.addProductToCartByIndex(0);
    await homePage.navigateToCart();
    await cartPage.proceedToCheckoutButton.click();
    await cartPage.registerLoginWhileCheckoutButton.click();
    await loginPage.registerUser(registerUserName, registerUserEmail);
    await registerUserPage.fillRegistrationForm(testData.registerUser);
    await registerUserPage.submitForm();
    await expect(registerUserPage.accountCreatedMessage).toBeVisible();
    await registerUserPage.continueButton.click();
    await expect(homePage.loggedInAsUser).toBeVisible();
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
    await registerUserPage.deleteAccount();
});