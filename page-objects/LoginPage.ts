// page-objects/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the login screen of the Sauce Demo application.
 * Encapsulates all element selectors and login-related actions.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Initializes locators for login elements.
   * @param page - Playwright page instance
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page.
   */
  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  /**
   * Fills login credentials and submits the form.
   * @param username - User's username
   * @param password - User's password
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Asserts that login was successful by checking the URL.
   */
  async assertLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
  }

  /**
   * Asserts that the login error message is visible and correct.
   * @param expectedMessage - Expected error message content
   */
  async assertLoginError(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}