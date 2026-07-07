import { test, expect } from '../fixtures/app.fixture';
import { users } from '../test-data/users';

test('standard user can log in', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(
    users.standard.username,
    users.standard.password,
  );

  await expect(page).toHaveURL(/inventory\.html/);
});

test('locked out user cannot log in', async ({ loginPage }) => {

  await loginPage.goto();
  await loginPage.login(
    users.lockedOut.username,
    users.lockedOut.password,
  );

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('locked out');
});