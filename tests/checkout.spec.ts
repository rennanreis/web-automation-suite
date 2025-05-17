import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.assertLoginSuccess();

    const productPage = new ProductPage(page);
    await productPage.addFirstProductToCart();
    await productPage.goToCart(); // Método corrigido aqui
  });

  test('Should complete checkout with valid info', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill checkout info
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345');

    // Complete checkout
    await checkoutPage.completeCheckout();
  });
});