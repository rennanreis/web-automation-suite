import { test, expect } from '@playwright/test';

// Test suite for cart functionality
test.describe('Cart Functionality', () => {

  // Runs before each test: logs in as a standard user
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
  });

  // Test: Add first product to cart and check cart badge
  test('Should add first product to cart', async ({ page }) => {
    // Click "Add to cart" on the first product
    await page.locator('.btn_inventory').first().click();

    // Check if the cart badge shows "1"
    const cartCount = await page.locator('.shopping_cart_badge').textContent();
    expect(cartCount).toBe('1');
  });
});
