import { test, expect } from '../fixtures/fixtures';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';

/**
 * Test suite for the full checkout flow.
 * Verifies that a user can go through the checkout process successfully.
 */
test.describe('Checkout Process', () => {
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
});