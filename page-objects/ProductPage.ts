// page-objects/ProductPage.ts
import { Page, Locator } from '@playwright/test';

/**
 * ProductPage groups actions for the product list screen.
 * Here I sort products, add items to the cart, and check the cart status.
 */
export class ProductPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('.product_sort_container');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('.btn_inventory');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

 /**
   * Opens the product list page.
   */
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  /**
   * Sorts products by the selected option.
   * Options: 'az', 'za', 'lohi', 'hilo'
   */
  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Returns a list with all product names shown.
   */
  async getAllProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

 /**
   * Returns a list with all product prices as numbers.
   */
  async getAllProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Adds a product to the cart by its position in the list.
   */
  async addProductToCartByIndex(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

   /**
   * Adds the first product in the list to the cart.
   */
  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

   /**
   * Returns the number of items shown in the cart badge.
   * Returns 0 if the badge is hidden.
   */
  async getCartItemCount(): Promise<number> {
    return (await this.cartBadge.isVisible()) 
      ? Number(await this.cartBadge.textContent()) 
      : 0;
  }

   /**
   * Opens the cart page by clicking the cart icon.
   */
  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}