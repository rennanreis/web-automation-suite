// page-objects/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage groups actions for the login screen.
 * Contains methods to interact with login elements and validate states.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Initializes all login page locators
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
   * Navigates to the login page
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  /**
   * Performs login with provided credentials
   * @param username - User's username
   * @param password - User's password
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Validates successful login by checking inventory page URL
   */
  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  /**
   * Validates login error message content
   * @param expectedMessage - Expected error message text
   */
  async assertLoginError(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}