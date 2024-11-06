import { Page, Locator } from '@playwright/test';

export class DriversPage {
  readonly page: Page;
  readonly addDriverButton: Locator;
  readonly removeAssitionalDriverButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addDriverButton = page.getByText('Добавить водителя');
    this.removeAssitionalDriverButton = page.locator('[data-test="remove-driver-1-link"]');
  }
}
