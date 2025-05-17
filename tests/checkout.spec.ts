import { test, expect } from '@playwright/test';

// Test suite for checkout functionality
test.describe('Checkout Process', () => {

  // Runs before each test: logs in and adds a product to the cart
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');
    
    // Fill in valid credentials
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    
    // Submit the login form
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);

    // Add the first product to the cart
    await page.locator('.btn_inventory').first().click();

    // Go to the cart page
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart/);
  });

  // Test: Complete checkout with valid data
  test('Should complete checkout with valid information', async ({ page }) => {
    // Click the checkout button
    await page.click('[data-test="checkout"]');

    // Fill out checkout information
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // Confirm overview page
    await expect(page).toHaveURL(/checkout-step-two/);

    // Finish checkout
    await page.click('[data-test="finish"]');

    // Assert confirmation message (corrected text)
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});