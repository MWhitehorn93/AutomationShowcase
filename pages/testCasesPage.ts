import { expect, Page } from '@playwright/test';

export class TestCase {
    readonly page: Page;
    readonly url = 'https://www.automationexercise.com/test_cases';
    readonly testCaseTitle;


    constructor(page: Page) {
        this.page = page;
        this.testCaseTitle = page.locator('b');
    }

    async expectTestCaseHeader() {
        await expect(this.testCaseTitle).toHaveText('Test Cases');
    }
}