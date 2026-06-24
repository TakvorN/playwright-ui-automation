import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test('products are visible after successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(inventoryPage.title).toHaveText('Products');
  await expect(inventoryPage.inventoryItems).toHaveCount(6);
  await expect(inventoryPage.shoppingCartLink).toBeVisible();
});