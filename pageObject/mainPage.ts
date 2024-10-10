import {Page, Locator} from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly vehicleNumber: Locator;
    readonly autocodeCalculateButton: Locator;
    readonly autoYearField: Locator;
    readonly autoPowerField: Locator;
    readonly licensePlateField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.vehicleNumber = page.locator('[data-test="input-mask"]');    
        this.autocodeCalculateButton = page.locator('[data-test="autocode-calculate"]');
        this.autoYearField = page.locator('[data-test="auto-year]');
        this.autoPowerField = page.locator('[data-test="auto-power"]');
        this.licensePlateField = page.locator('[data-test="autoidentifier-licensePlate"]');
    }
}