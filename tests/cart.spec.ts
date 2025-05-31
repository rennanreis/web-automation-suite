import { test, expect } from '../fixtures/fixtures';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';

/**
 * Test suite for cart functionality.
 * Covers adding products to cart, updating badge count, and removing products.
 */
test.describe('Cart Functionality', () => {

  test.beforeEach(async ({ resetState }) => {
    // Ensures the cart is empty before each test
    await resetState();
  });

  /**
   * Tests that adding a product to the cart updates the cart badge count
   * and the product is correctly listed on the cart page.
   */
  test('Should add first product to cart and update badge count', async ({ loginAndAddProductToCart, page }) => {
    // Logs in and adds a product using a composed fixture
    await loginAndAddProductToCart();

    const productPage = new ProductPage(page);
    // Checks that the cart badge displays "1"
    const cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Navigates to the cart and verifies that the product is listed
    await productPage.goToCart();
    const cartPage = new CartPage(page);
    const cartProductNames = await cartPage.getProductNames();
    expect(cartProductNames.length).toBeGreaterThan(0);
  });

  /**
   * Tests the full flow of adding, checking, and removing products from the cart.
   * Ensures the cart is empty after all items are removed.
   */
  test('Should add, check, and remove products from cart', async ({ loginAndAddProductToCart, page }) => {
    // Logs in and adds a product using a composed fixture
    await loginAndAddProductToCart();

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Validates that the cart badge displays "1"
    let cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Navigates to the cart and confirms the product is listed
    await productPage.goToCart();
    let cartProductNames = await cartPage.getProductNames();
    expect(cartProductNames.length).toBeGreaterThan(0);

    // Removes all items from the cart
    await cartPage.removeAllItems();

    // Ensures the cart is now empty
    cartProductNames = await cartPage.getProductNames();
    expect(cartProductNames.length).toBe(0);
  });
});
