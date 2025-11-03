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

📸 Screenshots

🎥 Video recordings

🧩 Trace files (step-by-step replay)