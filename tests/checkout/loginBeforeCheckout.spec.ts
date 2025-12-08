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

test('Register Before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterUserPage(page);
    const allProductsPage = new AllProductsPage(page);
    const cartPage = new CartPage(page);

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