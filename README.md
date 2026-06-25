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

## Project Structure

```text
playwright-ui-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── CartPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── test-data/
│   └── users.ts
├── tests/
│   ├── cart.spec.ts
│   ├── inventory.spec.ts
│   └── login.spec.ts
├── .gitignore
├── .nvmrc
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

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

The cart flow is marked with `@smoke` in the test title.

Run smoke tests only:

```bash
npx playwright test --grep @smoke
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
* Smoke-style cart validation
* TypeScript type-checking with `tsc --noEmit`
* Cross-browser test configuration
* GitHub Actions CI

