// page-objects/CartPage.ts
import { Page, Locator, expect } from '@playwright/test';

/**
 * CartPage groups actions for the shopping cart screen.
 * It includes item validation and checkout flow initiation.
 */
export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;

  /**
   * Initializes all locators for the cart page.
   * @param page - Playwright page instance
   */
  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('[data-test^="remove-"]');
  }

  /**
   * Returns all product names currently in the cart.
   */
  async getProductNames(): Promise<string[]> {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }

  /**
   * Proceeds to the checkout page if there are items in the cart.
   */
  async proceedToCheckout(): Promise<void> {
    await expect(this.cartItems).not.toHaveCount(0);
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  /**
   * Removes all products from the cart by clicking each "Remove" button.
   * Includes a slight delay for stability between interactions.
   */
  async removeAllItems(): Promise<void> {
    const count = await this.removeButtons.count();
    if (count === 0) return;

    for (let i = 0; i < count; i++) {
      await this.removeButtons.nth(0).click();
      await this.page.waitForTimeout(200);
    }

    await expect(this.cartItems).toHaveCount(0);
  }
}