import { Page, Locator } from '@playwright/test';

export class AutoPage {
  readonly page: Page;
  readonly autoBrandField: Locator;
  readonly autoModelField: Locator;
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
  readonly search: (text: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.autoBrandField = page.locator('[data-test="auto-brand"]');
    this.autoModelField = page.locator('[data-test="auto-model"]');
    this.documentChooseDropdown = page.getByLabel('Номер');
    this.vinNumberField = page.getByPlaceholder('Введите номер');
    this.autoidentifierNumberField = page.locator(
      '[data-test="autoidentifier-identifierNumber"]'
    );
    this.chassisNumberField = page.locator(
      '[data-test="autoidentifier-chassis"]'
    );
    this.backButton = page.locator('[data-test="back-button"]');
    this.nextButton = page.locator('[data-test="next-button"]');
    this.autoBrandError = page.getByText('Укажите марку');
    this.autoYearField = page.locator('[data-test="auto-year"]');
    this.autoPowerField = page.locator('[data-test="auto-power"]');
    this.licensePlateField = page.getByPlaceholder('А 000 АА 177');
    this.autoDocumentsNumberField = page.locator('[name="stsNumber"]');
    this.autoDocumentIssueDateField = page.locator(
      '[name="autoDocumentIssueDate"]'
    );
    this.search = (text) => page.getByText(text);
  }

  async fillAutoBrandField(autoBrand: string) {
    await this.autoBrandField.click();
    await this.search(autoBrand).click();
  }

  async fillAutoModelField(autoModel: string) {
    await this.autoModelField.click();
    await this.search(autoModel).click();
  }

  async fillAutoYearField(autoYear: string) {
    await this.autoYearField.click();
    await this.search(autoYear).click();
  }

  async fillAutoPowerField(autoPower: string) {
    await this.autoPowerField.click();
    await this.search(autoPower).click();
  }

  async fillLicensePlateField(licensePlate: string) {
    await this.licensePlateField.fill(licensePlate);
  }

  async fillVinNumberField(vinNumber: string) {
    await this.vinNumberField.fill(vinNumber);
  }

  async fillAutoDocumentsNumberField(autoDocumentsNumber: string) {
    await this.autoDocumentsNumberField.fill(autoDocumentsNumber);
  }

  async fillAutoDocumentIssueDateField(autoDocumentIssueDate: string) {
    await this.autoDocumentIssueDateField.fill(autoDocumentIssueDate);
  }

  async fillAutoPage(testData: {
    autoBrand: string;
    autoModel: string;
    autoYear: string;
    number: string;
    autoPower: string;
    vinNumber: string;
    autoDocumentsNumber: string;
    autoDocumentIssueDate: string;
  }) {
    await this.fillAutoBrandField(testData.autoBrand);
    await this.fillAutoModelField(testData.autoModel);
    await this.fillAutoYearField(testData.autoYear);
    await this.fillLicensePlateField(testData.number);
    await this.fillAutoPowerField(testData.autoPower);
    await this.fillVinNumberField(testData.vinNumber);
    await this.fillAutoDocumentsNumberField(testData.autoDocumentsNumber);
    await this.fillAutoDocumentIssueDateField(testData.autoDocumentIssueDate);
  }
}
