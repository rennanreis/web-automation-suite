import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

// Test: Login with valid credentials using the LoginPage Page Object
test('Login with valid credentials using Page Object', async ({ page }) => {
  // Instantiate the LoginPage Page Object
  const loginPage = new LoginPage(page);

  // Navigate to the login page
  await loginPage.goto();

  // Perform login with valid credentials
  await loginPage.login('standard_user', 'secret_sauce');

  // Assert that the login was successful
  await loginPage.assertLoginSuccess();
});
