# Playwright Automation Framework — Fintech take-home

## Overview
Small Playwright-based test framework with API and UI suites against a mock fintech backend (Users + Transactions). Designed to be easy to run locally and to demo during interviews.

## Repo highlights
- Mock API: `mock-server/server.js` (Express)
- Mock UI: `app/index.html` + `app/app.js`
- Tests: `tests/api/*` and `tests/ui/*` (Playwright)
- Utilities: `src/utils/factories.js`, `src/utils/helpers.js`, `src/utils/assertions.js`
- Config: `src/config/env.js`, `playwright.config.js` (reporters, webServer entries)

## Tech stack
- Playwright Test (runner)
- JavaScript (ESM)
- Mock backend: Node + Express
- Frontend: Vanilla JS + HTML
- Reports: Playwright HTML + JUnit XML

## Quick run (PowerShell)
1) Install dependencies (first time)

```powershell
npm install
npx playwright install --with-deps
```

2) Start servers (two terminals)

```powershell
npm run mock:api    # starts mock API on :4000
npm run serve:ui    # serves UI on :5173
```

3) Run tests

```powershell
npx playwright test                           # run all tests
npx playwright test --project="API Tests"    # API only
npx playwright test --project="UI - Chromium" # UI only
```

Headed demo (visual):

```powershell
npx playwright test --project="UI - Chromium" --headed --debug
```

Open HTML report:

```powershell
npx playwright show-report
```

## What the tests cover
- API: create/get users, create/list transactions, validation errors, auth negative test
- UI: registration flow and transaction creation + client-visible error messages

## Interview talking points
- Multi-project Playwright config separates API and UI concerns and enables focused runs.
- Factories centralize test data; helpers create request contexts with auth headers.
- Reporting: JUnit XML for CI, HTML report + traces/videos/screenshots for debugging failures.
- Test reliability: tests create their own preconditions (UI transaction test creates a user). For stronger parallelism, add a `POST /__test/reset` endpoint or spin per-worker mock servers.

## Notes / Next steps (optional)
- Make `app/app.js` environment-driven (it currently uses `http://localhost:4000` and static token). For CI, read base URL and token from `env` or use relative fetches.
- Add a small `demo.ps1` to run servers and a headed demo automatically.

---
Open `tests/` and `playwright.config.js` during the interview to show structure and reporting.
Playwright Automation Framework — Fintech Microservices (Take-Home Assessment)

Author: Ankit Rawat
Overview

This project is a comprehensive test automation framework built with Playwright (JavaScript) to demonstrate modern quality engineering practices for a Fintech microservices architecture.

It includes:

API and UI automated test suites

Mock backend (Express) and mock frontend (HTML/JS)

Test data management, environment configuration, and custom assertions

Cross-browser execution & rich reporting (HTML + JUnit + artifacts)

Architecture & Components

Folder Structure

    playwright-automation-suite/
    │
    ├── mock-server/           # Express mock backend (User + Transaction services)
    │   └── server.js
    │
    ├── app/                   # Static frontend for UI flow testing
    │   ├── index.html
    │   └── app.js
    │
    ├── src/
    │   ├── config/            # Environment variables and configs
    │   │   └── env.js
    │   └── utils/             # Reusable utilities
    │       ├── factories.js   # Test data factories
    │       ├── helpers.js     # API context + helper functions
    │       └── assertions.js  # Custom assertions
    │
    ├── tests/
    │   ├── api/               # API test specs
    │   │   ├── users.spec.js
    │   │   └── transactions.spec.js
    │   └── ui/                # UI test specs
    │       ├── registration.spec.js
    │       └── transaction.spec.js
    │
    ├── playwright.config.js   # Playwright configuration (multi-project setup)
    ├── package.json           # Scripts and dependencies
    └── README.md

Tech Stack
Category	Technology
Test Runner	Playwright Test

Language	JavaScript (ESM)
Backend Mock	Node.js + Express + CORS
Frontend Mock	Vanilla JS + HTML + Fetch API
Reports	Playwright HTML, JUnit XML
Browsers	Chromium, Firefox (configurable)

How to Run

1. Install Dependencies
npm install
npx playwright install --with-deps

2. Start the Mock Servers

Run these in two terminals:

Terminal 1 – Mock API:

npm run mock:api


Terminal 2 – Mock UI:

npm run serve:ui


Verify:

API → http://localhost:4000

UI → http://localhost:5173

3. Run Tests

Run all suites (API + UI):

npx playwright test


Run only API tests:

npx playwright test --project="API Tests"


Run only UI tests (Chromium):

npx playwright test --project="UI - Chromium"


Headed (visible browser):

npx playwright test --headed


Debug mode (with Inspector):

npx playwright test tests/ui/registration.spec.js --project="UI - Chromium" --debug

4️ View Reports

After any test run:

npx playwright show-report


Artifacts (on failure):

Screenshots

Video recordings

Trace files (step-by-step replay)