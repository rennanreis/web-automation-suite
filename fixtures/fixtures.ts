import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';

type TestData = {
  users: {
    standard: { username: string; password: string };
    locked: { username: string; password: string };
    invalid: { username: string; password: string };
  };
  products: string[];
};

/**
 * Custom test setup with fixtures for this project.
 * Here I create a reusable login fixture for tests that need authentication.
 */
export const test = base.extend<{
  /**
   * Centralized test data for users and products.
   */
  testData: TestData;
  /**
   * Logs in as the standard user before the test runs.
   * Use this fixture to avoid repeating the login steps in every test.
   */
  loginAsStandardUser: () => Promise<void>;
  /**
   * Adds a product to the cart and navigates to the cart page.
   */
  addProductToCart: () => Promise<void>;
  /**
   * Navigates to the products page after login.
   */
  navigateToProducts: () => Promise<void>;
  /**
   * Resets the state by removing all items from the cart.
   */
  resetState: () => Promise<void>;
}>({
  testData: async ({}, use) => {
    await use({
      users: {
        standard: { username: 'standard_user', password: 'secret_sauce' },
        locked: { username: 'locked_out_user', password: 'secret_sauce' },
        invalid: { username: 'invalid', password: 'invalid' }
      },
      products: ['Sauce Labs Backpack', 'Sauce Labs Bike Light']
    });
  },

  loginAsStandardUser: async ({ page }, use) => {
    const loginAsStandardUser = async () => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await loginPage.assertLoginSuccess();
    };
    await use(loginAsStandardUser);
  },

  addProductToCart: async ({ page, loginAsStandardUser }, use) => {
    const addProductToCart = async () => {
      await loginAsStandardUser();
      const productPage = new ProductPage(page);
      await productPage.addFirstProductToCart();
      await productPage.goToCart();
      const cartPage = new CartPage(page);
      await expect(cartPage.cartItems).not.toHaveCount(0);
    };
    await use(addProductToCart);
  },

  navigateToProducts: async ({ page, loginAsStandardUser }, use) => {
    const navigateToProducts = async () => {
      await loginAsStandardUser();
      const productPage = new ProductPage(page);
      await productPage.navigate();
    };
    await use(navigateToProducts);
  },

  resetState: async ({ page }, use) => {
    const resetState = async () => {
      const cartPage = new CartPage(page);
      await cartPage.removeAllItems();
    };
    await use(resetState);
  }
});

// Re-export expect to use in all tests
export { expect };