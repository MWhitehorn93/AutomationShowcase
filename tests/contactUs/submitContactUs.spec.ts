import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ContactUsPage } from '../../pages/contactUsPage';
import testData from '../../data/testData.json';

const registerUserName = 'TestUser';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
});

test('Register User and Delete user', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactUsPage = new ContactUsPage(page);

    await homePage.contactUsButton.click();
    await page.waitForURL(/\/contact_us$/);
    await page.pause();
    await contactUsPage.contactUs(
        testData.contactUs.name,
        testData.contactUs.email,
        testData.contactUs.subject,
        testData.contactUs.message,
        testData.contactUs.filePath
    );
    
})