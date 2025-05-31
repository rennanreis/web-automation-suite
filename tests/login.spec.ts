import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../page-objects/LoginPage';

/**
 * Test: Login with valid credentials using the login fixture.
 * The test starts already logged in as the standard user.
 */
test('Login with valid credentials using fixture', async ({ loginAsStandardUser, page }) => {
  await loginAsStandardUser();
  await expect(page).toHaveURL(/inventory/);
});

/**
 * Test: Login with invalid credentials.
 */
test('Login with invalid credentials', async ({ page, testData }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    testData.users.invalid.username,
    testData.users.invalid.password
  );
  await loginPage.assertLoginError(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

/**
 * Test: Login with locked user.
 */
test('Login with locked user', async ({ page, testData }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    testData.users.locked.username,
    testData.users.locked.password
  );
  await loginPage.assertLoginError(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});