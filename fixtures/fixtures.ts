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
 * Provides reusable authentication flows, navigation, and test data.
 */
export const test = base.extend<{
  /**
   * Centralized reusable test data (users, products).
   */
  testData: TestData;

  /**
   * Logs in as a standard user.
   * Use this in tests that require an authenticated session.
   */
  loginAsStandardUser: () => Promise<void>;

  /**
   * Logs in and adds the first product to the cart.
   * Useful for tests that begin with a product in the cart.
   */
  loginAndAddProductToCart: () => Promise<void>;

  /**
   * Logs in, adds a product, and navigates to the cart page.
   * Validates that the cart is not empty.
   */
  addProductToCart: () => Promise<void>;

  /**
   * Logs in and navigates to the product listing page.
   */
  navigateToProducts: () => Promise<void>;

  /**
   * Clears the cart by removing all items.
   * Use in beforeEach teardown or cleanup logic.
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

  loginAndAddProductToCart: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.assertLoginSuccess();

    await productPage.addFirstProductToCart();

    await use(async () => {});
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

// Re-export expect to be used in all tests
export { expect };