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

  test('Should add, check, and remove products from cart', async ({ page }) => {
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
