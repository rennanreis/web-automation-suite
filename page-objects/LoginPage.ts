// page-objects/LoginPage.ts
import { Page, expect } from '@playwright/test';

/**
 * LoginPage groups actions for the login screen.
 * Here I keep all steps to access the app using a username and password.
 */
export class LoginPage {
  readonly page: Page;

   /**
   * Needs the Playwright page instance to work.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Opens the login page of the application.
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

   /**
   * Fills the username and password fields and clicks the login button.
   */
  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

   /**
   * Checks if the login worked by confirming the URL.
   */
  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
  }
}
