import { test, expect } from '@playwright/test';
import { MainPage } from '../../pageObject/mainPage';
import { AutoPage } from '../../pageObject/autoPage';
import { ModalPage } from '../../pageObject/modalPage';

const baseUrl = 'https://www.banki.ru/insurance/order/auto/type/osago/';
const number = 'Р546ВВ164'

let mainPage: MainPage;
let autoPage: AutoPage;
const testData = {
  autoBrand: 'BMW',
  autoModel: '2 Series',
  autoYear: '2021',
  autoPower: '116',
  vinNumber: '34376746376743676',
  autoDocumentsNumber: '34РО 787878',
  autoDocumentIssueDate: '01.01.2021'
}

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  autoPage = new AutoPage(page);
  await page.goto(`${baseUrl}`, {timeout: 60000});
  await expect(page).toHaveTitle('Калькулятор ОСАГО 2024 - Купить ОСАГО онлайн расчет стоимости страховки на машину');
  await mainPage.autocodeCalculateButton.click();
})

test('check error message', async ({ page }) => {

  await expect(autoPage.autoBrandError).toBeHidden();
  await autoPage.autoBrandField.click();
  await page.keyboard.press('Tab');
  await expect(autoPage.autoBrandError).toBeVisible({timeout: 60000});
  await expect(autoPage.nextButton).toBeDisabled();
});

test('check disabled form on non-full data', async ({ page }) => {
  await expect(autoPage.autoModelField).toBeDisabled();
  await expect(autoPage.autoYearField).toBeDisabled();
  await expect(autoPage.autoPowerField).toBeDisabled();
  await expect(autoPage.nextButton).toBeDisabled();
});

test('check form on full data', async ({ }) => {
  await autoPage.licensePlateField.fill(number);
  await autoPage.autoModelField.fill(testData.autoModel);
  await autoPage.autoYearField.fill(testData.autoYear);
  await autoPage.autoPowerField.fill(testData.autoPower);
  await autoPage.autoBrandError.fill(testData.autoBrand);
  await autoPage.vinNumberField.fill(testData.vinNumber);
  await autoPage.autoDocumentsNumberField.fill(testData.autoDocumentsNumber);
  await autoPage.autoDocumentIssueDateField.fill(testData.autoDocumentIssueDate);

  await expect(autoPage.nextButton).toBeEnabled();
});

test('check next page', async ({ page }) => {
  await autoPage.licensePlateField.fill(number);
  await autoPage.autoBrandField.fill('BMW');
  await autoPage.autoModelField.fill('2 Series');
  await autoPage.autoYearField.fill('2021');
  await autoPage.autoPowerField.fill('116');
  await autoPage.vinNumberField.fill('34376746376743676');
  await autoPage.autoDocumentsNumberField.fill('34РО 787878');
  await autoPage.autoDocumentIssueDateField.fill('01.01.2021');

  await autoPage.nextButton.click();
  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/drivers`);
});

test('check back to previosly page', async ({ page }) => {
  await autoPage.autoBrandField.fill('BMW');
  await autoPage.autoModelField.fill('2 Series');
  await autoPage.autoYearField.fill('2021');
  await autoPage.autoPowerField.fill('116');
  await autoPage.vinNumberField.fill('34376746376743676');
  await autoPage.autoDocumentsNumberField.fill('34РО 787878');
  await autoPage.autoDocumentIssueDateField.fill('01.01.2021');

  await autoPage.nextButton.click();
  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/drivers`);

  await autoPage.backButton.click();
  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/auto?licensePlate=%D0%A0546%D0%92%D0%92164`);

  await expect(autoPage.autoModelField).toContainText(testData.autoModel);
  await expect(autoPage.autoYearField).toContainText(testData.autoYear);
  await expect(autoPage.autoPowerField).toContainText(testData.autoPower);
  await expect(autoPage.autoBrandError).toContainText(testData.autoBrand);
  await expect(autoPage.vinNumberField).toContainText(testData.vinNumber);
  await expect(autoPage.autoDocumentsNumberField).toContainText(testData.autoDocumentsNumber);
  await expect(autoPage.autoDocumentIssueDateField).toContainText(testData.autoDocumentIssueDate);
});

test('check modal to continue order', async ({ page }) => {
  await autoPage.autoBrandField.fill('BMW');
  await autoPage.autoModelField.fill('2 Series');
  await autoPage.autoYearField.fill('2021');
  await autoPage.autoPowerField.fill('116');
  await autoPage.vinNumberField.fill('34376746376743676');
  await autoPage.autoDocumentsNumberField.fill('34РО 787878');
  await autoPage.autoDocumentIssueDateField.fill('01.01.2021');

  await autoPage.nextButton.click();
  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/drivers`);

  await autoPage.backButton.click();
  await page.reload();

  const modal = new ModalPage(page)
  await expect(modal.headline).toBeVisible();
  await expect(modal.headline).toContainText('Хотите продолжить предыдущий расчет');

  await modal.continueButton.click();
  await expect(modal.headline).toBeHidden();
  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/drivers`);
});