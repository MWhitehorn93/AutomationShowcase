import { test, expect } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Test Case 14: Register While Checkout', async ({ homePage, registerPage, loginPage, allProductsPage, cartPage, generatedUser }) => {
    await homePage.navigateToAllProducts();
    await allProductsPage.addProductToCartByIndex(0);
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    await cartPage.registerLoginWhileCheckoutButton.click();
    await loginPage.registerUser(generatedUser.name, generatedUser.email);
    await registerPage.fillRegistrationForm(testData.registerUser);
    await registerPage.submitForm();
    await expect(registerPage.accountCreatedMessage).toBeVisible();
    await registerPage.continueButton.click();
    await expect(homePage.loggedInAsUser).toBeVisible();
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    await cartPage.assertAddressDetails(testData.registerUser);
    await cartPage.completeCheckout(testData.cardDetails);
    await registerPage.deleteAccount();
});

test('Test Case 15: Register Before Checkout', async ({ homePage, loginPage, registerPage, allProductsPage, cartPage, generatedUser }) => {
    await homePage.navigateToLoginPage();
    await loginPage.registerUser(generatedUser.name, generatedUser.email);
    await registerPage.fillRegistrationForm(testData.registerUser);
    await registerPage.submitForm();
    await expect(registerPage.accountCreatedMessage).toBeVisible();
    await registerPage.continueButton.click();
    await expect(homePage.loggedInAsUser).toBeVisible();
    await homePage.navigateToAllProducts();
    await allProductsPage.addProductToCartByIndex(0);
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    await cartPage.assertAddressDetails(testData.registerUser);
    await cartPage.completeCheckout(testData.cardDetails);
    await registerPage.deleteAccount();
});

test('Test Case 16: Login Before Checkout', async ({ homePage, loginPage, allProductsPage, cartPage }) => {
    await homePage.navigateToLoginPage();
    await loginPage.loginUser(testData.loginUser.email, testData.loginUser.password);
    await expect(homePage.getLoggedInAsText(testData.loginUser.userName)).toBeVisible();
    await homePage.navigateToAllProducts();
    await allProductsPage.addProductToCartByIndex(0);
    await homePage.navigateToCart();
    await cartPage.proceedToCheckout();
    await cartPage.assertAddressDetails(testData.loginUser);
    await cartPage.completeCheckout(testData.cardDetails);
});

