import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly url = 'https://www.automationexercise.com/';
  readonly homeLoginButton;
  readonly registerUserNameInput;
  readonly registerUserEmailInput;
  readonly registerUserButton;

  constructor(page: Page) {
    this.page = page;
    this.homeLoginButton = page.getByRole('link', { name: ' Signup / Login' });
    this.registerUserNameInput = page.getByRole('textbox', { name: 'Name' });
    this.registerUserEmailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.registerUserButton = page.getByRole('button', { name: 'Signup' });
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async registerUser(name: string, email: string) {
    await this.registerUserNameInput.fill(name);
    await this.registerUserEmailInput.fill(email);
    await this.registerUserButton.click();
  }
}

