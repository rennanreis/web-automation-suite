// page-objects/CheckoutPage.ts
import { Page, Locator, expect } from '@playwright/test';

/**
 * CheckoutPage handles the checkout form and final confirmation.
 * Here I fill user details and finish the purchase.
 */
export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

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
   * Fills the form with user data and goes to the next step.
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Completes the purchase and checks the success message.
   */
  async completeCheckout(): Promise<void> {
    await this.finishButton.click();
    await expect(this.confirmationMessage).toHaveText('Thank you for your order!');
  }
}