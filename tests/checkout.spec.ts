import { test, expect } from '../fixtures/fixtures';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';

/**
 * Test suite for the full checkout flow.
 * Verifies that a user can go through the checkout process successfully.
 */
test.describe('Checkout Process', () => {
  /**
   * Test: Should complete checkout with valid info.
   * Ensures that a valid user can go through the full purchase flow and receive confirmation.
   */
  test('Should complete checkout with valid info', async ({ loginAndAddProductToCart, page }) => {
    // Logs in and adds a product to the cart using the composed fixture
    await loginAndAddProductToCart();

    const productPage = new ProductPage(page);
    // Navigates to the cart page
    await productPage.goToCart();

    const cartPage = new CartPage(page);
    // Proceeds to the checkout page
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);
    // Fills in valid checkout information and completes the order
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345');
    await checkoutPage.completeCheckout();

    // Asserts that the confirmation message is displayed
    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
  });

  /**
   * Test: Should display error if required checkout fields are missing.
   * Ensures that an error message is shown when the user submits the form without filling fields.
   */
  test('Should display error if required checkout fields are missing', async ({ addProductToCart, page }) => {
    // Logs in and adds a product to the cart
    await addProductToCart();

    const productPage = new ProductPage(page);
    // Navigates to the cart page
    await productPage.goToCart();

    const cartPage = new CartPage(page);
    // Proceeds to the checkout page
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);
    // Attempts to submit the form without filling required fields
    await checkoutPage.continueButton.click();

    // Asserts that the proper error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Error: First Name is required');
  });
});
