import { test } from '../../fixtures';
import testData from '../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
});

test('Submit Contact Us Form', async ({ homePage, contactUsPage, page }) => {

    await homePage.contactUsButton.click();
    await page.waitForURL(/\/contact_us$/);
    await contactUsPage.contactUs(
        testData.contactUs.name,
        testData.contactUs.email,
        testData.contactUs.subject,
        testData.contactUs.message,
        testData.contactUs.filePath
    );
    
})