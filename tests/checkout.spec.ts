import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { checkoutData } from '../test-data/checkout';
import { users } from '../test-data/users';

test(
  'standard user can complete checkout',
  { tag: '@smoke' },
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password,
    );

    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();

    await expect(cartPage.itemNames).toContainText([
      'Sauce Labs Backpack',
    ]);

    await cartPage.beginCheckout();

    await expect(checkoutPage.title).toHaveText(
      'Checkout: Your Information',
    );

    await checkoutPage.enterCustomerInformation(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode,
    );

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.title).toHaveText(
      'Checkout: Overview',
    );

    await checkoutPage.finishCheckout();

    await expect(checkoutPage.completeHeader).toHaveText(
      'Thank you for your order!',
    );
    await expect(page).toHaveURL(/checkout-complete\.html/);
  },
);