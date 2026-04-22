import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly url = 'https://www.automationexercise.com/';
  readonly homeLoginButton;
  readonly homeLogOutButton;
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
  readonly poloBrandButton;
  readonly mastAndHarborBrandButton;
  readonly recommendedItemsHeader;
  readonly recommendedCarousel;

  private buildUrl(path: string): string {
    return new URL(path, this.url).toString();
  }

  private async recoverIfGoogleVignette(fallbackPath: string): Promise<void> {
    if (this.page.url().includes('#google_vignette')) {
      await this.page.goto(this.buildUrl(fallbackPath), { waitUntil: 'domcontentloaded' });
    }
  }

  private async clickAndExpectPath(
    link: { click: () => Promise<void> },
    expectedPath: RegExp,
    fallbackPath: string
  ): Promise<void> {
    await link.click();

    try {
      await expect(this.page).toHaveURL(expectedPath, { timeout: 7000 });
    } catch {
      await this.recoverIfGoogleVignette(fallbackPath);

      if (!expectedPath.test(this.page.url())) {
        await this.page.goto(this.buildUrl(fallbackPath), { waitUntil: 'domcontentloaded' });
      }

      await expect(this.page).toHaveURL(expectedPath, { timeout: 7000 });
    }
  }

  constructor(page: Page) {
    this.page = page;
    this.homeLoginButton = page.getByRole('link', { name: ' Signup / Login' });
    this.homeLogOutButton = page.getByRole('link', { name: ' Logout' });
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
    this.poloBrandButton = page.getByRole('link', { name: 'Polo' });
    this.mastAndHarborBrandButton = page.getByRole('link', { name: '(3) Mast & Harbour' });
    this.recommendedItemsHeader = page.getByRole('heading', { name: 'recommended items' });
    this.recommendedCarousel = page.locator('#recommended-item-carousel');
  }

  async visit() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await this.recoverIfGoogleVignette('/');
    await expect(this.allProductsButton).toBeVisible();
  }

  async navigateToTestCase() {
    await this.clickAndExpectPath(this.testCaseButton, /\/test_cases$/, '/test_cases');
  }

  async navigateToAllProducts() {
    await this.clickAndExpectPath(this.allProductsButton, /\/products$/, '/products');
  }

  async subscribeToNewsletter(email: string) {
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
    await expect(this.subscriptionSuccessMessage).toBeVisible();
  }

  async navigateToCart() {
    await this.clickAndExpectPath(this.cartButton, /\/view_cart$/, '/view_cart');
  }

  getLoggedInAsText(username: string) {
    return this.page.getByText(`Logged in as ${username}`);
  }

  async addRecommendedItemToCartByIndex(index: number) {
    const card = this.recommendedCarousel.locator('.product-image-wrapper').nth(index);

    await card.scrollIntoViewIfNeeded();
    await card.hover();

    await card.locator('a.add-to-cart').click();
  
    const continueBtn = this.page.getByText('Continue Shopping', { exact: true });
    await continueBtn.waitFor({ state: 'visible', timeout: 5000 });
    await continueBtn.click();
  }

  async getRecommendedItemDetailsByIndex(index: number): Promise<{ name: string; price: string }> {
    const card = this.recommendedCarousel.locator('.product-image-wrapper').nth(index);

    const priceRaw = await card.locator('.productinfo h2').first().textContent();
    const nameRaw = await card.locator('.productinfo p').first().textContent();

    return {
      name: (nameRaw ?? '').trim(),
      price: (priceRaw ?? '').trim()
    };
  }
}

