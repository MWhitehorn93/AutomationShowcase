import { test as base, Page } from '@playwright/test';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { CartPage } from './pages/cartPage';
import { RegisterUserPage } from './pages/registerUserPage';
import { AllProductsPage } from './pages/allProductsPage';
import { ProductDetailPage } from './pages/productPage';
import { ContactUsPage } from './pages/contactUsPage';
import { TestCasePage } from './pages/testCasesPage';

type PageObjects = {
  generatedUser: {
    name: string;
    email: string;
  };
  homePage: HomePage;
  loginPage: LoginPage;
  cartPage: CartPage;
  registerPage: RegisterUserPage;
  allProductsPage: AllProductsPage;
  productPage: ProductDetailPage;
  contactUsPage: ContactUsPage;
  testCasePage: TestCasePage;
};

export const test = base.extend<PageObjects>({
  generatedUser: async ({}, use) => {
    await use({
      name: 'TestUser',
      email: `testuser_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@gmail.com`
    });
  },

  page: async ({ page }, use) => {
    const blockedPatterns = [
      /googlesyndication\.com/i,
      /doubleclick\.net/i,
      /googleadservices\.com/i,
      /mediago\.io/i,
      /adservice\.google\.com/i
    ];

    await page.route('**/*', route => {
      const requestUrl = route.request().url();
      if (blockedPatterns.some(pattern => pattern.test(requestUrl))) {
        return route.abort();
      }

      return route.continue();
    });

    page.on('dialog', async dialog => {
      await dialog.dismiss();
    });

    await page.addInitScript(() => {
      window.open = () => null;
    });

    await use(page);
  },

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
    const testCasePage = new TestCasePage(page);
    await use(testCasePage);
  },
});

export { expect } from '@playwright/test';
