import { test, expect } from '@playwright/test';

// Test: Successful login with valid credentials
test('Login with valid credentials', async ({ page }) => {
  // Navigate to the Swag Labs login page
  await page.goto('https://www.saucedemo.com/');

  // Fill in the username field with a valid user
  await page.fill('#user-name', 'standard_user');

  // Fill in the password field with the correct password
  await page.fill('#password', 'secret_sauce');

  // Click the login button to submit the form
  await page.click('#login-button');

  // Assert that the login was successful by checking the URL
  await expect(page).toHaveURL(/inventory/); // Should be redirected to the inventory page
});
