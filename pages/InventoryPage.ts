import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly addBackpackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.addBackpackButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}