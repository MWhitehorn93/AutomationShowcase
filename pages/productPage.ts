import { Page, expect } from '@playwright/test';

export class ProductDetailPage {
    readonly page: Page
    readonly productInformation;
    readonly quantityInput;
    readonly addToCartButton;
    readonly reviewNameInput;
    readonly reviewEmailInput;
    readonly reviewInput;
    readonly reviewSubmitButton;
    readonly successMessage;

    constructor(page: Page) {
        this.page = page;
        this.productInformation = page.locator('.product-information');
        this.quantityInput = page.locator('#quantity');
        this.addToCartButton = page.getByRole('button', { name: ' Add to cart' });
        this.reviewNameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.reviewEmailInput = page.getByRole('textbox', { name: 'Email Address', exact: true });
        this.reviewInput = page.getByRole('textbox', { name: 'Add Review Here!' });
        this.reviewSubmitButton = page.getByRole('button', { name: 'Submit' });
        this.successMessage = page.getByText('Thank you for your review.');
    }
  
    async getFirstProductDetails() {
        const name = await this.page.locator('.product-information h2').textContent();
        const category = await this.page.locator('.product-information p:nth-of-type(1)').textContent();
        const price = await this.page
        .locator('.product-information span')
        .nth(1)
        .textContent();
        const availability = await this.page.locator('.product-information p:nth-of-type(2)').textContent();
        const condition = await this.page.locator('.product-information p:nth-of-type(3)').textContent();
        const brand = await this.page.locator('.product-information p:nth-of-type(4)').textContent();

        return {
            name: name?.trim(),
            category: category?.replace('Category: ', '').replace(' >', '').trim(),
            price: price?.trim(),
            availability: availability?.replace('Availability:', '').trim(),
            condition: condition?.replace('Condition:', '').trim(),
            brand: brand?.replace('Brand:', '').trim()
        };
    }
    async assertProductDetails(name: string, category: string, price: string, availability: string, condition: string, brand: string){
        await expect(this.productInformation).toContainText(name);
        await expect(this.productInformation).toContainText(category);
        await expect(this.productInformation).toContainText(price);
        await expect(this.productInformation).toContainText(availability);
        await expect(this.productInformation).toContainText(condition);
        await expect(this.productInformation).toContainText(brand);
    }

    async setQuantity(quantity: number) {
        await this.quantityInput.fill(quantity.toString());
    }

    async writeReview(name: string, email: string, reviewText: string) {
        await this.reviewNameInput.fill(name);
        await this.reviewEmailInput.fill(email);
        await this.reviewInput.fill(reviewText);
        await this.reviewSubmitButton.click();
        await expect(this.successMessage).toBeVisible();
    }
}

