import {Page, Locator} from '@playwright/test';

export class AutoPage {
    readonly page: Page
    readonly autoBrandField: Locator
    readonly autoModelField: Locator
    readonly chooseModel: Locator
    constructor(page: Page) {
        this.page = page;
        this.autoBrandField = page.locator('[data-test="auto-brand"]');
        this.autoModelField = page.locator('[data-test="auto-model"]');
        this.chooseModel = page.locator('[data-test="choose-model"]');
    }
}