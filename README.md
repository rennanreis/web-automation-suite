# Web Automation Suite

**License** | **Status** | **Last Update**

> Note: This project is part of a personal portfolio and is not open to external contributions (pull requests or issues) at this time.

An end-to-end test automation suite for the Sauce Labs Demo Site using Playwright.  
This project showcases modern QA practices using the Page Object Model (POM), reusable fixtures, and structured reporting.

---

## Quick Start

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run all tests:
   ```bash
   npx playwright test
   ```

---

## Repository Structure

```
├── fixtures/ # Reusable setup and utility code for tests
├── node_modules/ # Project dependencies (auto-generated)
├── page-objects/ # Page Object Model implementations
├── reports/ # Test execution reports
├── tests/ # Automated test scripts
├── .gitignore # Git ignore rules
├── LICENSE # Project license
├── package-lock.json # Exact dependency versions
├── package.json # Project dependencies and scripts
├── playwright.config.ts # Playwright configuration file
├── README.md # Project documentation
└── tsconfig.json # TypeScript configuration
```

---

## What's Inside

- **Page Object Model (POM)** structure for scalable test maintenance.
- **Fixtures** for consistent setup across multiple tests.
- **Reports** generated after each test run.
- **TypeScript** support for better developer experience and code quality.

---

## How to Use

- Review the `tests/` and `page-objects/` folders to understand test flow and architecture.
- Customize `playwright.config.ts` as needed for environments, retries, and devices.
- Use the `reports/` folder to analyze test outcomes and troubleshoot failures.

---

## About

This project is intended as a demonstration of modern, maintainable, and scalable E2E test automation using Playwright.

All test scenarios are based on the [Sauce Labs Demo Site](https://www.saucedemo.com/), widely used for QA experimentation and training.

---

## License

Distributed under the MIT License.
