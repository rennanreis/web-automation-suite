import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';

test.describe('Checkout Process', () => {
  test('Should complete checkout with valid info', async ({ addProductToCart, page }) => {
    await addProductToCart();

    const productPage = new ProductPage(page);
    await productPage.goToCart();

    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345');
    await checkoutPage.completeCheckout();
    
    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
  });
});