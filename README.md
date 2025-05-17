# Web Automation Suite

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Status: Portfolio](https://img.shields.io/badge/status-portfolio-blue)
![Last Update](https://img.shields.io/badge/last%20update-May%202025-brightgreen)

> Note: This project is part of a personal portfolio and is not open to external contributions (pull requests or issues) at this time.

An end-to-end test automation suite for the [Sauce Labs Demo Site](https://www.saucedemo.com/) using Playwright and TypeScript.  
This project demonstrates modern QA practices including isolated test files, clear scenario coverage, and a roadmap for progressive refactoring using the Page Object Model, fixtures, and structured reporting.

---

## Quick Start

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run all tests:
   ```bash
   npx playwright test
   ```
4. Run a specific test file:
   ```bash
   npx playwright test tests/cart.spec.ts
   ```
5. Run in headed mode:
   ```bash
   npx playwright test tests/cart.spec.ts --headed
   ```
6. Open Playwright Test UI:
   ```bash
   npx playwright test --ui
   ```

---

## Repository Structure

```
├── node_modules/ # Project dependencies (auto-generated)
├── page-objects/ # Page Object Model implementations
│ ├── LoginPage.ts
│ ├── ProductPage.ts
│ ├── CartPage.ts
│ └── CheckoutPage.ts
├── reports/ # Test execution reports
├── tests/ # Automated test scripts
│ ├── login.spec.ts # Login scenario
│ ├── search.spec.ts # Product search and sorting
│ ├── cart.spec.ts # Add to cart
│ ├── checkout.spec.ts # Checkout process
│ └── confirmation.spec.ts # Order confirmation
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

---

## Covered Test Scenarios

- **Login:** Valid credentials login flow
- **Product Search & Sorting:** Sorting products by price and name (A-Z, Z-A, low-high, high-low)
- **Cart:** Adding a product to the cart and validating the cart badge
- **Checkout:** Completing the checkout with valid information
- **Order Confirmation:** Validating the confirmation message and returning to the products page 

---

## Project Highlights

- Applies the Page Object Model to keep UI interactions organized and easier to maintain.
- Each test file focuses on a real user scenario (login, sorting, cart, checkout, confirmation).
- All code is written in TypeScript for better readability and type safety.
- Uses Conventional Commits for a clear and understandable commit history.
- English comments are included throughout the code to help with understanding and future maintenance.
- The project is structured to make it easier to add new features and improvements as my learning progresses.

---

## Roadmap & Next Steps

- ✅ Refactored all tests to use the Page Object Model
- ✅ Improved code comments and documentation
- ✅ Covered main user flows: login, sorting, cart, checkout, confirmation
- 🔄 Add reusable fixtures for setup and teardown
- ➕ Expand test coverage with negative and edge case scenarios
- 📚 Add more documentation and usage examples
- 🔧 Integrate reporting and CI pipeline

---

## About

This project is intended as a demonstration of modern, maintainable, and scalable end-to-end test automation using Playwright.  
All scenarios are based on the Sauce Labs Demo Site, a widely used environment for QA training and experimentation.

---

## License

Distributed under the MIT License.