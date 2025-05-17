import { test, expect } from '@playwright/test';

// Test suite for product search and sorting functionality
test.describe('Product Search', () => {

  // Runs before each test: logs in as a standard user
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');
    
    // Fill in valid credentials
    await page.fill('#user-name', 'standard_user');   // Username field
    await page.fill('#password', 'secret_sauce');     // Password field
    
    // Submit the login form
    await page.click('#login-button');                // Login button

    // Assert successful login by checking the URL
    await expect(page).toHaveURL(/inventory/);        // Post-login URL validation
  });

  // Test: Sort products by price (low to high)
  test('Should sort products by price (low to high)', async ({ page }) => {
    // Select the "low to high" sorting option
    await page.selectOption('.product_sort_container', 'lohi'); // 'lohi' = Low to High

    // Get all displayed product prices
    const prices = await page.locator('.inventory_item_price').allTextContents();

    // Convert price strings to numbers (remove '$' and parse as float)
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

    // Create a sorted copy of the prices array for comparison
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    // Assert that the displayed prices are sorted in ascending order
    expect(numericPrices).toEqual(sortedPrices);
  });
});
