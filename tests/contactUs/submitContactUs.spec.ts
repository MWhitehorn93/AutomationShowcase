import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ContactUsPage } from '../../pages/contactUsPage';
import testData from '../../data/testData.json';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Register User and Delete user', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactUsPage = new ContactUsPage(page);

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