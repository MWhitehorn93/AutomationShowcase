import { Page } from '@playwright/test';

export class ContactUsPage {
    readonly page: Page;
    readonly nameInput;
    readonly emailInput;
    readonly subjectInput;
    readonly messageInput;
    readonly chooseFileInput;
    readonly submitButton;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('[data-qa="name"]');
        this.emailInput = page.locator('[data-qa="email"]');
        this.subjectInput = page.locator('[data-qa="subject"]');
        this.messageInput = page.locator('[data-qa="message"]');
        this.chooseFileInput = page.getByRole('button', { name: 'Choose File' });
        this.submitButton = page.locator('[data-qa="submit-button"]');
    }

    async contactUs(name: string, email: string, subject: string, message: string, filePath?: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
        await this.chooseFileInput.setInputFiles(filePath || []);
        await this.submitButton.click();
    }
    
}