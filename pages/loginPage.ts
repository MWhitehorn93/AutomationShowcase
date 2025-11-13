import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly url = 'https://www.automationexercise.com/';
  readonly homeLoginButton;
  readonly registerUserNameInput;
  readonly registerUserEmailInput;
  readonly registerUserButton;
  readonly loginEmailInput;
  readonly loginPasswordInput;
  readonly loginButton;
  readonly loginErrorMessage;
  readonly existingEmailErrorMessage;

  constructor(page: Page) {
    this.page = page;
    this.homeLoginButton = page.getByRole('link', { name: ' Signup / Login' });
    this.registerUserNameInput = page.getByRole('textbox', { name: 'Name' });
    this.registerUserEmailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.registerUserButton = page.getByRole('button', { name: 'Signup' });
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginErrorMessage = page.getByText('Your email or password is');
    this.existingEmailErrorMessage = page.getByText('Email Address already exist!');

  }

  async visit() {
    await this.page.goto(this.url);
  }

  async registerUser(name: string, email: string) {
    await this.registerUserNameInput.fill(name);
    await this.registerUserEmailInput.fill(email);
    await this.registerUserButton.click();
  }

  async loginUser(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}