import {Page, Locator} from '@playwright/test';

export class ModalPage {

    readonly page: Page;
    readonly startNewButton: Locator;
    readonly continueButton: Locator;
    readonly headline: Locator;

    constructor(page: Page) {
        this.page = page;
        this.startNewButton = page.locator('[data-test="start-new-button"]');
        this.continueButton = page.locator('[data-test="continue-button"]');
        this.headline = page.locator('h3');
    }
}

