// page-objects/CartPage.ts
import { Page, Locator, expect } from '@playwright/test';

/**
 * CartPage groups actions for the shopping cart screen.
 * Here I check what's in the cart and start the checkout process.
 */
export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly removeButtons: Locator; // melhor marcar como readonly

  /**
   * Creates a new CartPage instance.
   * Needs the Playwright page to interact with the browser.
   */
  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('[data-test^="remove-"]');
  }

  /**
   * Returns a list of product names in the cart.
   */
  async getProductNames(): Promise<string[]> {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }

  /**
   * Clicks the checkout button to continue the purchase.
   */
  async proceedToCheckout(): Promise<void> {
    await expect(this.cartItems).not.toHaveCount(0);
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  /**
   * Removes all items from the cart by clicking each "Remove" button sequentially
   */
  async removeAllItems(): Promise<void> {
    const count = await this.removeButtons.count();
    if (count === 0) return;

    for (let i = 0; i < count; i++) {
      await this.removeButtons.nth(0).click();
      await this.page.waitForTimeout(200); // pequena pausa para estabilidade
    }

    await expect(this.cartItems).toHaveCount(0);
  }
}