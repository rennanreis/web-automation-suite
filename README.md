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
├── fixtures/             # Reusable setup and utility code (to be implemented)
├── node_modules/         # Project dependencies (auto-generated)
├── page-objects/         # Page Object Model implementations (planned)
├── reports/              # Test execution reports
├── tests/                # Automated test scripts
│   ├── login.spec.ts         # Login scenario
│   ├── search.spec.ts        # Product search and sorting
│   ├── cart.spec.ts          # Add to cart
│   ├── checkout.spec.ts      # Checkout process
│   └── confirmation.spec.ts  # Order confirmation
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

- **Login**: Valid credentials login flow  
- **Product Search**: Sorting products by price (low to high)  
- **Cart**: Adding a product to the cart and validating the cart badge  
- **Checkout**: Completing the checkout with valid information  
- **Order Confirmation**: Validating the confirmation message and returning to the products page  

---

## Project Highlights

- Isolated, functional test files with clear scenario coverage  
- Progressive enhancements including Page Object Model, fixtures, and advanced reporting  
- Full TypeScript support for type safety and maintainability  
- Clean commit history with conventional commit messages

---

## Roadmap & Next Steps

- ✅ Implement core user flow test files  
- 🔄 Refactor tests using the Page Object Model  
- 🧱 Add reusable fixtures for setup and teardown  
- ➕ Expand test coverage (including negative and edge cases)  
- 📚 Improve documentation and provide usage examples  
- 🔧 Integrate reporting and CI pipeline suggestions  

---

## About

This project is intended as a demonstration of modern, maintainable, and scalable end-to-end test automation using Playwright.  
All scenarios are based on the Sauce Labs Demo Site, a widely used environment for QA training and experimentation.

---

## License

Distributed under the MIT License.