import { Page } from '@playwright/test';

export class TestCase {
    readonly page: Page;
    readonly testCaseTitle;


    constructor(page: Page) {
        this.page = page;
        this.testCaseTitle = page.locator('b');
    }
}