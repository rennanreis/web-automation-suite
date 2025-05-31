# Web Automation Suite

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Status: Portfolio](https://img.shields.io/badge/status-portfolio-blue)
![Last Update](https://img.shields.io/badge/last%20update-May%202025-brightgreen)

> ⚠️ This project is part of a personal portfolio and is not open to external contributions (pull requests or issues) at this time.

An end-to-end test automation suite for the [Sauce Labs Demo Site](https://www.saucedemo.com/) using Playwright and TypeScript.  
It demonstrates modern QA practices like Page Object Model, custom fixtures, reusable test flows, and future-proof structure.

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/web-automation-suite

# Install dependencies
npm install

# Run all tests
npx playwright test

# Run a specific test
npx playwright test tests/cart.spec.ts

# Run in headed mode
npx playwright test --headed

# Launch test runner UI
npx playwright test --ui
```
---

## Repository Structure

```
├── page-objects/        # Page Object Model definitions
├── fixtures/            # Custom test fixtures (auth, data, setup)
├── tests/               # Individual test files
├── playwright.config.ts # Playwright configuration
├── README.md            # Project documentation
```

---

## ✅ Covered Test Scenarios

- **Login:** Valid, invalid and locked credentials  
- **Search & Sorting:** Sorting by price and name (A-Z, Z-A, low-high, high-low)  
- **Cart:** Adding and removing products  
- **Checkout:** Successful checkout flow and validation of required fields  
- **Confirmation:** Confirmation message + return navigation  

---

## 🧪 Fixtures & Reusability

This project uses Playwright’s custom fixtures to:

- Reuse login flows (`loginAsStandardUser`)
- Set up products in cart (`addProductToCart`, `loginAndAddProductToCart`)
- Navigate directly to protected routes (`navigateToProducts`)
- Centralize test data (`testData` fixture with valid/invalid users and product names)
- Clean up state before/after tests (`resetState`)

➡️ This drastically reduces boilerplate and improves test readability.

---

## 🧠 Project Highlights

- Page Object Model for clean test logic and maintenance  
- Custom fixtures to handle setup, teardown, and user flows  
- English comments and clear test scenarios  
- Modular and scalable structure  
- Commit history follows Conventional Commits for clarity  
- Tailored for QA portfolios and real-world team practices  

---

## 📌 Roadmap & Status

- ✅ Page Object Model applied to all test suites  
- ✅ Centralized and reusable fixtures implemented  
- ✅ All major flows (positive and negative) tested  
- ✅ Test comments standardized in English  
- ✅ Project structure cleaned and documented  
- 🔧 CI pipeline (GitHub Actions) – next step  
- 📊 Add code coverage reports  
- 📝 Connect test coverage with blog article  

---

## 🎯 About

This project was created as part of a self-study path to master QA automation with Playwright.  
It simulates a real QA engineer workflow in a production team, with emphasis on code readability, maintainability, and CI readiness.

All scenarios are built on top of the **Sauce Labs Demo App**, a sandbox platform widely used in testing practices.

---

## 📝 License

MIT — feel free to read and learn, but external PRs are currently not accepted.

---