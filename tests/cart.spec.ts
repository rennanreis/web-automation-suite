import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';

test.describe('Cart Functionality', () => {
  // Runs before each test: logs in as a standard user
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.assertLoginSuccess();
  });

  test('Should add first product to cart and update badge count', async ({ page }) => {
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
});
