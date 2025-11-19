import { Page } from '@playwright/test';

export class ProductDetailPage {

    constructor(private page: Page) {}
  
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
}

