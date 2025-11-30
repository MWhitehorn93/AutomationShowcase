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
  readonly subscriptionEmailInput;
  readonly subscribeButton;
  readonly subscriptionSuccessMessage;
  readonly cartButton;
  readonly loggedInAsUser;
  readonly womenCategoryButton;
  readonly womenDressCategoryButton;
  readonly womenDressCategoryHeader;
  readonly mensCategoryButton;
  readonly menJeansCategoryButton;
  readonly meanJeansHeader;

  constructor(page: Page) {
    this.page = page;
    this.homeLoginButton = page.getByRole('link', { name: ' Signup / Login' });
    this.homeLogOutButton = page.getByRole('link', { name: ' Logout' });
    this.testUserLoggedInMessage = page.getByText('Logged in as MWhitehorn');
    this.contactUsButton = page.getByRole('link', { name: ' Contact us' });
    this.testCaseButton = page.getByRole('link', { name: ' Test Cases' });
    this.allProductsButton = page.getByRole('link', { name: ' Products' });
    this.subscriptionEmailInput = page.getByRole('textbox', { name: 'Your email address' });
    this.subscribeButton = page.getByRole('button', { name: '' });
    this.subscriptionSuccessMessage = page.getByText('You have been successfully');
    this.cartButton = page.getByRole('link', { name: ' Cart' });
    this.loggedInAsUser = page.getByText('Logged in as TestUser');
    this.womenCategoryButton = page.getByRole('link', { name: ' Women' });
    this.womenDressCategoryButton = page.getByRole('link', { name: 'Dress' });
    this.womenDressCategoryHeader = page.getByRole('heading', { name: 'Women -  Dress Products' });
    this.mensCategoryButton = page.getByRole('link', { name: ' Men' });
    this.menJeansCategoryButton = page.getByRole('link', { name: 'Jeans' });
    this.meanJeansHeader = page.getByRole('heading', { name: 'Men -  Jeans Products' });

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

  async subscribeToNewsletter(email: string) {
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
    await expect(this.subscriptionSuccessMessage).toBeVisible();
  }

  async navigateToCart() {
    await this.cartButton.click();
    await expect(this.page).toHaveURL(/\/view_cart$/);
  }

  getLoggedInAsText(username: string) {
    return this.page.getByText(`Logged in as ${username}`);
}
}

