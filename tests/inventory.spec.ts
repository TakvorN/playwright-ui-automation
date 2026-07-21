import { test, expect } from '../fixtures/app.fixture';
import { users } from '../test-data/users';

test(
  'products are visible after successful login',
  async ({ loginPage, inventoryPage }) => {

    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password,
    );

    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
    await expect(inventoryPage.shoppingCartLink).toBeVisible();
  },
);

test(
  'standard user can sort products by name descending',
  async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password,
    );

    await inventoryPage.sortByNameDescending();

    const productNames = await inventoryPage.getProductNames();
    const sortedProductNames = [...productNames].sort((a, b) =>
      b.localeCompare(a),
    );

    expect(productNames).toEqual(sortedProductNames);
    await expect(inventoryPage.productSortSelect).toHaveValue('za');
  },
);