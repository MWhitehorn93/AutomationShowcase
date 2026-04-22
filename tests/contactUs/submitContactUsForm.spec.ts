import { test } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToContactUs();
});

test('Test Case 6: Contact Us Form', async ({ homePage, contactUsPage, page }) => {
    await contactUsPage.contactUs(
        testData.contactUs.name,
        testData.contactUs.email,
        testData.contactUs.subject,
        testData.contactUs.message,
        testData.contactUs.filePath
    );
})