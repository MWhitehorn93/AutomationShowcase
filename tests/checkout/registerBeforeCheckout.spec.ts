import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { RegisterUserPage } from '../../pages/registerUserPage';
import { LoginPage } from '../../pages/loginPage';
import { AllProductsPage } from '../../pages/allProductsPage';
import { CartPage } from '../../pages/cartPage';
import testData from '../../data/testData.json';

const registerUserName = 'TestUser';
const registerUserEmail = `testuser_${Date.now()}@gmail.com`;

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Register Before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterUserPage(page);
    const allProductsPage = new AllProductsPage(page);
    const cartPage = new CartPage(page);

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