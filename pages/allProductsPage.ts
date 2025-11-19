import { expect, Page } from '@playwright/test';

export class AllProductsPage {
    readonly page: Page;
    readonly url = 'https://www.automationexercise.com/products';
    readonly pageTitle;
    readonly searchBar;
    readonly searchButton;
    readonly searchForm;
    readonly productSearchPrice;
    readonly allProductsForm;
    readonly allProductsTitle;
    readonly firstProductButton;
    readonly productCards;
    readonly continueShoppingButton;
    readonly viewProductButton;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByRole('textbox', { name: 'Search Product' });
        this.pageTitle = page.getByRole('heading', { name: 'All Products' });
        this.searchButton = page.getByRole('button', { name: '' });
        this.searchForm = page.getByText('Searched Products  Added!');
        this.productSearchPrice = page.getByRole('heading', { name: 'Rs.' }).first();
        this.allProductsForm = page.getByText('All Products  Added! Your');
        this.allProductsTitle = page.getByRole('heading', { name: 'All Products' });
        this.firstProductButton = page.getByRole('link', { name: ' View Product' }).first();
        this.productCards = page.locator('.product-image-wrapper');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewProductButton = page.getByRole('link', { name: ' View Product' });
    }

    async singleSearchProduct(productName: string) {
        await this.searchBar.fill(productName);
        await this.searchButton.click();
    }

    async assertProductSearch(productName: string, productPrice: string) {
        const productElement = this.searchForm.getByText(productName, { exact: true }).first();

        await expect(this.productSearchPrice).toContainText(productPrice)
        await expect(productElement).toBeVisible();
    }

    async assertAllProducts() {
        await expect(this.allProductsForm).toBeVisible();
        await expect(this.allProductsTitle).toBeVisible();
    }

    async navigateToFirstProduct() {
        await this.firstProductButton.click();
    }

    async getProductPriceByIndex(index: number) {
        const priceText = await this.productCards.nth(index).locator('.productinfo h2').textContent();
        return priceText?.trim() || '';
    }

    async addProductToCartByIndex(index: number) {
        const product = this.productCards.nth(index);

        await product.scrollIntoViewIfNeeded();
        await product.hover();
        
        const addToCartButton = product.locator('.product-overlay .add-to-cart');

        await addToCartButton.click();
        await this.continueShoppingButton.click();
    }
}
