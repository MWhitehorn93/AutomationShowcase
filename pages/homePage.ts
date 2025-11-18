import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly url = 'https://www.automationexercise.com/';
  readonly homeLoginButton;
  readonly homeLogOutButton;
  readonly testUserLoggedInMessage;
  readonly contactUsButton;
  readonly testCaseButton;
  readonly allProductsButton;

  constructor(page: Page) {
    this.page = page;
    this.homeLoginButton = page.getByRole('link', { name: ' Signup / Login' });
    this.homeLogOutButton = page.getByRole('link', { name: ' Logout' });
    this.testUserLoggedInMessage = page.getByText('Logged in as MWhitehorn');
    this.contactUsButton = page.getByRole('link', { name: ' Contact us' });
    this.testCaseButton = page.getByRole('link', { name: ' Test Cases' });
    this.allProductsButton = page.getByRole('link', { name: ' Products' });
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async navigateToTestCase() {
    await this.testCaseButton.click();
  }

  async navigateToAllProducts() {
    await this.allProductsButton.click();
    await expect(this.page).toHaveURL(/\/products$/);
  }
}

