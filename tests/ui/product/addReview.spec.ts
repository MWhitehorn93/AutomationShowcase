import { test } from '../../../fixtures/fixtures';
import testData from '../../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Add Review to a product', async ({ homePage, allProductsPage, productPage }) => {


    await homePage.navigateToAllProducts();
    await allProductsPage.navigateToFirstProduct();
    await productPage.writeReview(
        testData.review.name,
        testData.review.email,
        testData.review.reviewText
    );
});