import { test, expect } from '../fixtures/fixtures';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';

/**
 * Test suite for the full checkout flow.
 * Verifies that a user can go through the checkout process successfully.
 */
test.describe('Checkout Process', () => {
  test('Should complete checkout with valid info', async ({ addProductToCart, page }) => {
    // Use fixture to log in and add a product to the cart
    await addProductToCart();

    const productPage = new ProductPage(page);
    // Navigate to the cart after product is added
    await productPage.goToCart();

    const cartPage = new CartPage(page);
    // Proceed to the checkout page
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);
    // Fill in checkout information and complete the order
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345');
    await checkoutPage.completeCheckout();

    // Verify that the confirmation message is shown
    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
  });
});