import {Page, Locator} from '@playwright/test';

export class AutoPage {
    readonly page: Page
    readonly autoBrandField: Locator
    readonly autoModelField: Locator
    readonly documentChooseDropdown: Locator;
    readonly vinNumberField: Locator;
    readonly autoidentifierNumberField: Locator;
    readonly chassisNumberField: Locator;
    readonly backButton: Locator;
    readonly nextButton: Locator;
    readonly autoBrandError: Locator;
    readonly autoYearField: Locator;
    readonly autoPowerField: Locator;
    readonly licensePlateField: Locator;
    readonly autoDocumentsNumberField: Locator;
    readonly autoDocumentIssueDateField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.autoBrandField = page.locator('[data-test="auto-brand"]');
        this.autoModelField = page.locator('[data-test="auto-model"]');
        this.documentChooseDropdown = page.getByLabel('Номер');
        this.vinNumberField = page.locator('[data-test="autoidentifier-vinNumber"]');
        this.autoidentifierNumberField = page.locator('[data-test="autoidentifier-identifierNumber"]');
        this.chassisNumberField = page.locator('[data-test="autoidentifier-chassis"]');
        this.backButton = page.locator('[data-test="back-button"]');
        this.nextButton = page.locator('[data-test="next-button"]');
        this.autoBrandError = page.getByText('Укажите марку');
        this.autoYearField = page.locator('[data-test="auto-year"]');
        this.autoPowerField = page.locator('[data-test="auto-power"]');
        this.licensePlateField = page.locator('[data-test="autoidentifier-licensePlate"')
        this.autoDocumentsNumberField = page.locator('[data-test="autodocuments-seriesNumber"]');
        this.autoDocumentIssueDateField = page.locator('[data-test="autodocuments-issueDate"]');
    }
}