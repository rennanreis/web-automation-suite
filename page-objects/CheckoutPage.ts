// page-objects/CheckoutPage.ts
import { Page, Locator, expect } from '@playwright/test';

/**
 * CheckoutPage handles actions related to the checkout flow.
 * It includes filling out customer information and completing the order.
 */
export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

  /**
   * Initializes all locators used in the checkout process.
   * @param page - Playwright page instance
   */
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationMessage = page.locator('.complete-header');
  }

  /**
   * Fills the checkout form with user data and proceeds to the next step.
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @param postalCode - User's postal code
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Completes the checkout process and verifies the confirmation message.
   */
  async completeCheckout(): Promise<void> {
    await this.finishButton.click();
    await expect(this.confirmationMessage).toHaveText('Thank you for your order!');
  }
}