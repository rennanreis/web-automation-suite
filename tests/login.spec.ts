import { test, expect } from '../fixtures/fixtures';

/**
 * Test: Login with valid credentials using the login fixture.
 * The test starts already logged in as the standard user.
 */
test('Login with valid credentials using fixture', async ({ loginAsStandardUser, page, testData }) => {
  await loginAsStandardUser();
  // Now the user is logged in, we can check if the URL is correct
  await expect(page).toHaveURL(/inventory/);
});