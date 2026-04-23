import { test } from '../../../fixtures/fixtures';
import testData from '../../../data/testData.json';

test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToContactUs();
});

test('Test Case 6: Contact Us Form', async ({contactUsPage}) => {
    await contactUsPage.contactUs(
        testData.contactUs.name,
        testData.contactUs.email,
        testData.contactUs.subject,
        testData.contactUs.message,
        testData.contactUs.filePath
    );
})