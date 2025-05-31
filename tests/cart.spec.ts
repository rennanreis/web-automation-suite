import { test, expect } from '../fixtures/fixtures';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';

/**
 * Test suite for cart functionality.
 * Covers adding products to cart, updating badge count, and removing products.
 */
test.describe('Cart Functionality', () => {

  test.beforeEach(async ({ resetState }) => {
    await resetState();
  });

  /**
   * Tests that adding a product to the cart updates the cart badge count
   * and the product is correctly listed on the cart page.
   */
  test('Should add first product to cart and update badge count', async ({ loginAsStandardUser, page }) => {
    await loginAsStandardUser();
    const productPage = new ProductPage(page);

    // Add the first product to the cart
    await productPage.addFirstProductToCart();

    // Validate that the cart badge displays "1"
    const cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Go to the cart page and check if the product is listed
    await productPage.goToCart();
    const cartPage = new CartPage(page);
    const cartProductNames = await cartPage.getProductNames();
    expect(cartProductNames.length).toBeGreaterThan(0);
  });

  /**
   * Tests the complete flow of adding, checking, and removing products from the cart.
   * Validates that the cart is empty after removing all items.
   */
  test('Should add, check, and remove products from cart', async ({ loginAsStandardUser, page }) => {
    await loginAsStandardUser();
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // 1. Add the first product to the cart
    await productPage.addFirstProductToCart();

    // 2. Validate that the cart badge displays "1"
    let cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // 3. Go to the cart page and check if the product is listed
    await productPage.goToCart();
    let cartProductNames = await cartPage.getProductNames();
    expect(cartProductNames.length).toBeGreaterThan(0);

    // 4. Remove all items from the cart
    await cartPage.removeAllItems();

    // 5. Check if the cart is empty
    cartProductNames = await cartPage.getProductNames();
    expect(cartProductNames.length).toBe(0);
  });
});