import { test, expect } from '../fixtures/app.fixture';
import { checkoutData } from '../test-data/checkout';
import { users } from '../test-data/users';

test(
  'standard user can complete checkout',
  { tag: '@smoke' },
  async ({ 
    page,
     loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
 }) => {
 
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

test(
    'checkout requires a postal code', 
  async ({ 
    page,
     loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
 }) => {

  await loginPage.goto();
  await loginPage.login(
    users.standard.username,
    users.standard.password,
  );

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await cartPage.beginCheckout();

  await checkoutPage.enterCustomerInformation(
    checkoutData.firstName,
    checkoutData.lastName,
    '',
  );

  await checkoutPage.continueToOverview();

  await expect(checkoutPage.errorMessage).toBeVisible();
  await expect(checkoutPage.errorMessage).toContainText(
    'Postal Code is required',
  );
  await expect(checkoutPage.title).toHaveText(
    'Checkout: Your Information',
  );
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});