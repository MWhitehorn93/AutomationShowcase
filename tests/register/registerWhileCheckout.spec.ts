import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
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

test('Rigister While Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerUserPage = new RegisterUserPage(page);
    const loginPage = new LoginPage(page);
    const allProductsPage = new AllProductsPage(page);
    const cartPage = new CartPage(page);

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
    await cartPage.placeOrderButton.click();
    await cartPage.enterPaymentDetailsAndPay(
        testData.cardDetails.nameOnCard,
        testData.cardDetails.cardNumber,
        testData.cardDetails.cvc,
        testData.cardDetails.expirationMonth,
        testData.cardDetails.expirationYear);
    await cartPage.assertOrderPlaced();
    await registerUserPage.deleteAccount();
});