import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

/**
 * Custom test setup with fixtures for this project.
 * Here I create a reusable login fixture for tests that need authentication.
 */
export const test = base.extend<{
  /**
   * Logs in as the standard user before the test runs.
   * Use this fixture to avoid repeating the login steps in every test.
   */
  loginAsStandardUser: () => Promise<void>;
}>({
  loginAsStandardUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.assertLoginSuccess();
    // Makes the login available for the test
    await use(() => Promise.resolve());
  },
});

// Re-export expect to use in all tests
export { expect } from '@playwright/test';