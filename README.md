# Playwright UI Automation

![Playwright Tests](https://github.com/TakvorN/playwright-ui-automation/actions/workflows/playwright.yml/badge.svg)

TypeScript + Playwright UI automation project for testing key user flows in the SauceDemo demo e-commerce application.

This project demonstrates browser-based end-to-end test automation with Playwright Test, Page Object Model structure, reusable test data, TypeScript type-checking, and GitHub Actions CI.

## Tech Stack

* TypeScript
* Playwright Test
* Node.js / npm
* Page Object Model
* GitHub Actions

## Tested Application

The tests run against [SauceDemo](https://www.saucedemo.com/), a demo e-commerce application commonly used for UI automation practice.

## Covered Scenarios

* Standard user can log in successfully
* Locked-out user cannot log in and receives an error message
* Product inventory is visible after successful login
* Standard user can add a product to the cart and verify it in the cart
* Standard user can complete the full checkout flow

## Project Structure

```text
playwright-ui-automation/
├── .github/
│   └── workflows
│       └── playwright.yml
├── .gitignore
├── .nvmrc
├── README.md
├── fixtures/
│   └── app.fixture.ts
├── package-lock.json
├── package.json
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── playwright.config.ts
├── test-data/
│   ├── checkout.ts
│   └── users.ts
├── tests/
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── inventory.spec.ts
│   └── login.spec.ts
└── tsconfig.json
```
## Custom Fixtures

The project extends Playwright's base `test` object with custom fixtures for the Page Object classes.

This allows tests to request only the page objects they need:

```ts
test('products are visible after successful login', async ({
  loginPage,
  inventoryPage,
}) => {
  await loginPage.goto();
  await loginPage.login(
    users.standard.username,
    users.standard.password,
  );

  await expect(inventoryPage.title).toHaveText('Products');
});
```

This keeps Page Object setup reusable while leaving the tested user actions explicit inside each scenario.

## Setup

Use the Node.js version specified in `.nvmrc`:

```bash
nvm use
```

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

On Linux/WSL, browser system dependencies may also be required:

```bash
sudo npx playwright install-deps
```

## Running Tests

Run all tests across configured browsers:

```bash
npm test
```

Run only Chromium tests:

```bash
npm run test:chromium
```

Run TypeScript type-checking:

```bash
npm run type-check
```

Open the Playwright HTML report after a test run:

```bash
npm run report
```

## Smoke Tests

The complete checkout journey is tagged as `@smoke`.

Run smoke tests across all configured browsers:

```bash
npm run test:smoke
```

## Notes on Headed Mode in WSL

The project includes a headed-mode script:

```bash
npm run test:headed
```

When running inside WSL, headed browser mode may require GUI/X server support. Headless mode is used by default and is suitable for local automation and CI.

## CI

GitHub Actions runs the test suite on push and pull request events. The workflow installs dependencies, installs Playwright browsers and Linux dependencies, runs TypeScript type-checking, runs Playwright tests, and uploads the Playwright HTML report as an artifact.

## Key Concepts Demonstrated

* Playwright locators and web-first assertions
* Page Object Model for maintainable UI automation
* Reusable test data
* Positive and negative login scenarios
* Complete end-to-end checkout smoke flow
* Custom Playwright fixtures for reusable Page Object injection
* TypeScript type-checking with `tsc --noEmit`
* Cross-browser test execution across Chromium, Firefox, and Webkit
* GitHub Actions CI with Playwright HTML report artifacts

