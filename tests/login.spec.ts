import { test, expect } from '@playwright/test';

test('standard user can log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);
});


test('locked out user cannot log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByTestId('username').fill('locked_out_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  const errorMessage = page.getByTestId('error');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('locked out');
});