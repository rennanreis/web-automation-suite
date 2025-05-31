// page-objects/ProductPage.ts
import { Page, Locator, expect } from '@playwright/test';

/**
 * ProductPage groups actions for the product list screen.
 * Handles sorting, cart interactions, and validations.
 */
export class ProductPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly addToCartButtons: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('.product_sort_container');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  /**
   * Navigate to the product listing page.
   */
  async navigate(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  /**
   * Sort products by the selected option.
   * Options: 'az', 'za', 'lohi', 'hilo'
   */
  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Get all visible product names.
   */
  async getAllProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  /**
   * Get all visible product prices as numbers.
   */
  async getAllProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Add a product to the cart by index in the product list.
   */
  async addProductToCartByIndex(index: number): Promise<void> {
    await this.addToCartButtons.nth(index).click();
  }

  /**
   * Add the first product in the list to the cart.
   */
  async addFirstProductToCart(): Promise<void> {
    await this.addToCartButtons.first().click();
  }

  /**
   * Get the number shown in the cart badge.
   * Returns 0 if the badge is not visible.
   */
  async getCartItemCount(): Promise<number> {
    return (await this.cartBadge.isVisible())
      ? Number(await this.cartBadge.textContent())
      : 0;
  }

  /**
   * Navigate to the cart page from the cart icon.
   */
  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html', { timeout: 15000 });
  }
}