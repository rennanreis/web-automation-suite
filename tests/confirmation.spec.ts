import { test, expect } from '@playwright/test';

// Test suite for order confirmation
test.describe('Order Confirmation', () => {

  // Runs before each test: logs in, adds a product, and completes checkout up to confirmation
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);

    // Add product to cart
    await page.locator('.btn_inventory').first().click();

    // Go to cart
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart/);

    // Start checkout
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(page).toHaveURL(/checkout-step-two/);

    // Finish checkout
    await page.click('[data-test="finish"]');
    await expect(page).toHaveURL(/checkout-complete/);
  });

  // Test: Validate confirmation message and return to products
  test('Should display confirmation message and allow return to products', async ({ page }) => {
    // Assert confirmation message
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

    // Click "Back Home" button
    await page.click('[data-test="back-to-products"]');

    // Assert user is redirected to inventory page
    await expect(page).toHaveURL(/inventory/);
  });
});