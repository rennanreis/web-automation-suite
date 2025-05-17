import { Page } from '@playwright/test';

/**
 * ProductPage groups actions for the product list screen.
 * Here I sort products, add items to the cart, and check the cart status.
 */
export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

 /**
   * Opens the inventory page.
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

   /**
   * Sorts the products by the selected option.
   * Options: 'az', 'za', 'lohi', 'hilo'
   */
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.selectOption('.product_sort_container', option);
  }

  /**
   * Returns a list with all product names shown.
   */
  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  /**
   * Returns a list with all product prices as numbers.
   */
  async getProductPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Adds the first product in the list to the cart.
   */
  async addFirstProductToCart() {
    await this.page.locator('.btn_inventory').first().click();
  }


  /**
   * Returns the cart badge count as a string, or null if empty.
   */
  async getCartCount(): Promise<string | null> {
    const badge = this.page.locator('.shopping_cart_badge');
    return (await badge.count()) ? await badge.textContent() : null;
  }
}