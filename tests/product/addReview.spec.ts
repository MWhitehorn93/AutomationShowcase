import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AllProductsPage } from '../../pages/allProductsPage';
import testData from '../../data/testData.json';
import { ProductDetailPage } from '../../pages/productPage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Add Review to a product', async ({ page }) => {
    const homePage = new HomePage(page);
    const allProductsPage = new AllProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);


    await homePage.navigateToAllProducts();
    await allProductsPage.navigateToFirstProduct();
    await productDetailPage.writeReview(
        testData.review.name,
        testData.review.email,
        testData.review.reviewText
    );
});