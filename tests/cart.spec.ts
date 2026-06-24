import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test('standard user can add a product to the cart @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await inventoryPage.addBackpackToCart();
  
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

  await inventoryPage.openCart();

  await expect(cartPage.title).toHaveText('Your Cart');
  await expect(cartPage.itemNames).toContainText(['Sauce Labs Backpack']);
});