import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly subscriptionEmailInput;
  readonly subscribeButton;
  readonly subscriptionSuccessMessage;

    constructor(page: Page) {
    this.page = page;
    this.subscriptionEmailInput = page.getByRole('textbox', { name: 'Your email address' });
    this.subscribeButton = page.getByRole('button', { name: '' });
    this.subscriptionSuccessMessage = page.getByText('You have been successfully');
    }

    async subscribeToNewsletter(email: string) {
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
    await expect(this.subscriptionSuccessMessage).toBeVisible();
    }
}