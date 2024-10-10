import { test, expect } from '@playwright/test';
import { MainPage } from '../../pageObject/mainPage';

test('has title', async ({ page }) => {
  await page.goto('https://www.banki.ru/insurance/order/auto/type/osago/?source=submenu_osago');
  await expect(page).toHaveTitle('Калькулятор ОСАГО 2024 - Купить ОСАГО онлайн расчет стоимости страховки на машину');
});

test('get started link', async ({ page }) => {
  await page.goto('https://www.banki.ru/insurance/order/auto/type/osago/?source=submenu_osago');

  const mainPage = new MainPage(page);
  await mainPage.vehicleNumber.fill('Р546ВВ164');
  await mainPage.autocodeCalculateButton.click();

  await page.waitForResponse('')
  await expect(page).toHaveTitle('https://www.banki.ru/insurance/order/auto/type/osago/short-flow/steps/auto?licensePlate=%D0%A0546%D0%92%D0%92164')
});
