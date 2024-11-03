import { test, expect } from '@playwright/test';
import { MainPage } from '../../pageObject/mainPage';
import { AutoPage } from '../../pageObject/autoPage';
import { ModalPage } from '../../pageObject/modalPage';

const baseUrl = 'https://www.banki.ru/insurance/order/auto/type/osago';

let mainPage: MainPage;
let autoPage: AutoPage;
const testData = {
  autoBrand: 'BMW',
  autoModel: '2 Series',
  autoYear: '2021',
  autoPower: '116',
  vinNumber: '34376746376743676',
  autoDocumentsNumber: '34 РО 787878',
  autoDocumentIssueDate: '01.01.2021',
  number: 'Р546ВВ164',
}

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await page.goto(`${baseUrl}`, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Калькулятор ОСАГО 2024 - Купить ОСАГО онлайн расчет стоимости страховки на машину');
  await mainPage.autocodeCalculateButton.click();
  autoPage = new AutoPage(page);
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

test('check form on full data', async ({ page }) => {
  await page.waitForURL(`${baseUrl}/short-flow/steps/auto?licensePlate=`, {waitUntil: 'domcontentloaded'});	
  await autoPage.fillAutoPage(testData);
  await expect(autoPage.nextButton).toBeEnabled();
});

test('check next page', async ({ page }) => {
  await page.waitForURL(`${baseUrl}/short-flow/steps/auto?licensePlate=`, {waitUntil: 'domcontentloaded'});	
  await autoPage.fillAutoPage(testData);
  await autoPage.nextButton.click();

  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/drivers`);
  expect(await page.locator('[data-test="next-button"]').isDisabled()).toBe(true);
});

test('check back to previosly page', async ({ page }) => {
  await page.waitForURL(`${baseUrl}/short-flow/steps/auto?licensePlate=`, {waitUntil: 'domcontentloaded'});	
  await autoPage.fillAutoPage(testData);
  await autoPage.nextButton.click();

  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/drivers`);

  await autoPage.backButton.click();
  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/auto`);

  await expect(autoPage.autoModelField).toHaveValue(testData.autoModel);
  await expect(autoPage.autoYearField).toHaveValue(testData.autoYear);
  await expect(autoPage.autoPowerField).toHaveValue(testData.autoPower);
  await expect(autoPage.autoBrandField).toHaveValue(testData.autoBrand);
  await expect(autoPage.vinNumberField).toHaveValue(testData.vinNumber);
  await expect(autoPage.autoDocumentsNumberField).toHaveValue(testData.autoDocumentsNumber);
  await expect(autoPage.autoDocumentIssueDateField).toHaveValue(testData.autoDocumentIssueDate);
});

test('check modal to continue order', async ({ page }) => {
  await autoPage.fillAutoPage(testData);

  await autoPage.nextButton.click();
  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/drivers`);
  await page.reload();

  const modal = new ModalPage(page)
  await expect(modal.headline).toBeVisible();
  await expect(modal.headline).toContainText('Хотите продолжить предыдущий расчет');

  await modal.continueButton.click();
  await expect(modal.headline).toBeHidden();
  await expect(page).toHaveURL(`${baseUrl}/short-flow/steps/drivers`);
});