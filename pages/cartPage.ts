import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly subscriptionEmailInput;
  readonly subscribeButton;
  readonly subscriptionSuccessMessage;
  readonly cartRows;
  readonly cartDescription;
  readonly cartQuantity;
  readonly proceedToCheckoutButton;
  readonly registerLoginWhileCheckoutButton;
  readonly placeOrderButton;
  readonly nameOnCardInput;
  readonly cardNumberInput;
  readonly cvcInput;
  readonly expirationMonthInput;
  readonly expirationYearInput;
  readonly payButton;
  readonly orderPlacedHeader;
  readonly orderPlacedMessage;
  readonly addressBox;
  readonly cartBody;
  readonly removeFirstProductButton;

    constructor(page: Page) {
      this.page = page;
      this.subscriptionEmailInput = page.getByRole('textbox', { name: 'Your email address' });
      this.subscribeButton = page.getByRole('button', { name: '' });
      this.subscriptionSuccessMessage = page.getByText('You have been successfully');
      this.cartRows = page.locator('table.table.table-condensed tbody tr');
      this.cartDescription = page.locator('.cart_description');
      this.cartQuantity = page.locator('.cart_quantity');
      this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
      this.registerLoginWhileCheckoutButton = page.getByRole('link', { name: 'Register / Login' })
      this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
      this.nameOnCardInput = page.locator('input[name="name_on_card"]');
      this.cardNumberInput = page.locator('input[name="card_number"]');
      this.cvcInput = page.getByRole('textbox', { name: 'ex.' });
      this.expirationMonthInput = page.getByRole('textbox', { name: 'MM' });
      this.expirationYearInput = page.getByRole('textbox', { name: 'YYYY' });
      this.payButton = page.getByRole('button', { name: 'Pay and Confirm Order' });
      this.orderPlacedHeader = page.getByText('Order Placed!');
      this.orderPlacedMessage = page.getByText('Congratulations! Your order');
      this.addressBox = page.getByText('Your delivery address . Josh');
      this.cartBody = page.locator('#cart_info');
      this.removeFirstProductButton = page.locator('.cart_quantity_delete').first()
    }

    async subscribeToNewsletter(email: string) {
      await this.subscriptionEmailInput.fill(email);
      await this.subscribeButton.click();
      await expect(this.subscriptionSuccessMessage).toBeVisible();
    }

    async getCartProductPriceByIndex(index: number): Promise<string> {
      const row = this.cartRows.nth(index);

      const price = await row.locator('.cart_price p').textContent();

      return price?.trim() ?? '';
    }

    async getCartProductNameByIndex(index: number): Promise<string> {
      const row = this.cartRows.nth(index);
      const raw = await row.locator('.cart_description h4 a').textContent();
      return (raw ?? '').trim();
    }

    async getCartTotalPriceByIndex(index: number): Promise<string> {
      const row = this.cartRows.nth(index);

      const price = await row.locator('.cart_total_price').textContent();

      return price?.trim() ?? '';
    }

    async enterPaymentDetailsAndPay(nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string) {
      await this.nameOnCardInput.fill(nameOnCard);
      await this.cardNumberInput.fill(cardNumber);
      await this.cvcInput.fill(cvc);
      await this.expirationMonthInput.fill(expiryMonth);
      await this.expirationYearInput.fill(expiryYear);
      await this.payButton.click();
    }

    async assertOrderPlaced() {
      await expect(this.orderPlacedHeader).toBeVisible();
      await expect(this.orderPlacedMessage).toBeVisible();
    }

    getDeliveryAddressHeader(name: string) {
    return this.page.getByText(`Your delivery address . ${name}`);
    }

    async assertDeliveryAddress(firstName: string, address1: string, address2: string, city: string, state: string, zipCode: string, country: string) {
      await expect(this.getDeliveryAddressHeader(firstName)).toContainText(address1);
      await expect(this.getDeliveryAddressHeader(firstName)).toContainText(address2);
      await expect(this.getDeliveryAddressHeader(firstName)).toContainText(city);
      await expect(this.getDeliveryAddressHeader(firstName)).toContainText(state);
      await expect(this.getDeliveryAddressHeader(firstName)).toContainText(zipCode);
      await expect(this.getDeliveryAddressHeader(firstName)).toContainText(country);
    }

    async assertProductsInCart(productName: string) {
      await expect(this.cartBody).toContainText(productName);
    }

    async assertProductsNotInCart(productName: string) {
      await expect(this.cartBody).not.toContainText(productName);
    }
}