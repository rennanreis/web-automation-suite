import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';

/**
 * Test suite for the order confirmation screen.
 * Ensures that after a successful checkout, the user sees the expected message
 * and can return to the product listing.
 */
test.describe('Order Confirmation', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.assertLoginSuccess();

    const productPage = new ProductPage(page);
    await productPage.addFirstProductToCart();
    await productPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345');
    await checkoutPage.finishButton.click(); // Avança para a página de confirmação
  });

  test('Should display confirmation message and allow returning to products', async ({ page }) => {
    // Assert confirmation message
    const confirmationMessage = page.locator('.complete-header');
    await expect(confirmationMessage).toHaveText('Thank you for your order!');

    // Click "Back Home" button and assert redirection
    await page.click('[data-test="back-to-products"]');
    await expect(page).toHaveURL(/inventory/);
  });
});