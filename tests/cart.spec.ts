import { test, expect } from '../fixtures/app.fixture';
import { users } from '../test-data/users';

test('standard user can add a product to the cart', async ({ loginPage, inventoryPage, cartPage, }) => {

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await inventoryPage.addBackpackToCart();
  
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

  await inventoryPage.openCart();

  await expect(cartPage.title).toHaveText('Your Cart');
  await expect(cartPage.itemNames).toContainText(['Sauce Labs Backpack']);
  },
);