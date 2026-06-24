import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.itemNames = page.getByTestId('inventory-item-name');
  }
}