# Playwright TypeScript Automation Framework

![Playwright Tests](https://github.com/Lipu7790/playwright-typescript-automation/actions/workflows/playwright.yml/badge.svg)

End-to-end UI and REST API test automation built with **Playwright Test + TypeScript**, using the **Page Object Model**, typed test data, custom fixtures and CI on GitHub Actions.

Author: **Md. Motiur Rahman Lipu**, SQA Engineer · [LinkedIn](https://linkedin.com/in/md-motiur-rahman-a0a454193)

## What is tested

| Area | Application | Scenarios |
|------|-------------|-----------|
| UI: Login | [saucedemo.com](https://www.saucedemo.com) | Valid login, locked-out user, invalid credentials, required-field validation, logout, protected-page redirect |
| UI: Inventory | saucedemo.com | Sort by name/price, add/remove cart items (CRUD-style), cart contents |
| UI: Checkout | saucedemo.com | Full end-to-end purchase, price/tax total check, form validation for each required field |
| API: Booking | [Restful Booker](https://restful-booker.herokuapp.com) | Auth token, Create / Read / Update / Delete, update without token (403), bad credentials, 404 on missing booking |

Tests are tagged `@smoke` or `@regression` so suites can be run separately.

## Project structure

```
├── pages/                  # Page Object Model classes (typed)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/pages.ts       # Custom fixtures (page objects + logged-in state)
├── test-data/              # Typed test data, kept separate from tests
├── tests/
│   ├── ui/                 # Browser tests
│   └── api/                # API tests (APIRequestContext)
├── playwright.config.ts    # Projects: ui-chromium, ui-firefox, api
└── .github/workflows/      # CI pipeline
```

## Run locally

Requires Node.js 20+.

```bash
npm install
npx playwright install

npm test                 # everything
npm run test:ui          # UI tests in Chromium
npm run test:api         # API tests only
npm run test:smoke       # @smoke tagged tests
npm run test:regression  # @regression tagged tests
npm run test:headed      # watch the browser
npm run report           # open the HTML report
npm run typecheck        # TypeScript type check
```

## Reporting and debugging

- HTML report generated after every run (`playwright-report/`)
- Screenshots, video and traces are kept on failure; open a trace with `npx playwright show-trace <trace.zip>`
- CI uploads the HTML report as a build artifact
