import { test as base, Page } from '@playwright/test';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { CartPage } from './pages/cartPage';
import { RegisterUserPage } from './pages/registerUserPage';
import { AllProductsPage } from './pages/allProductsPage';
import { ProductDetailPage } from './pages/productPage';
import { ContactUsPage } from './pages/contactUsPage';
import { TestCase } from './pages/testCasesPage';

type PageObjects = {
  homePage: HomePage;
  loginPage: LoginPage;
  cartPage: CartPage;
  registerPage: RegisterUserPage;
  allProductsPage: AllProductsPage;
  productPage: ProductDetailPage;
  contactUsPage: ContactUsPage;
  testCasePage: TestCase;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterUserPage(page);
    await use(registerPage);
  },

  allProductsPage: async ({ page }, use) => {
    const allProductsPage = new AllProductsPage(page);
    await use(allProductsPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductDetailPage(page);
    await use(productPage);
  },

  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
  },

  testCasePage: async ({ page }, use) => {
    const testCasePage = new TestCase(page);
    await use(testCasePage);
  },
});

export { expect } from '@playwright/test';
