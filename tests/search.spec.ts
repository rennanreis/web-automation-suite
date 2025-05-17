import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/ProductPage';

test.describe('Product Search and Sorting', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.assertLoginSuccess();
  });

  test('Should sort products by price (low to high)', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.sortProducts('lohi');
    const prices = await productPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('Should sort products by price (high to low)', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.sortProducts('hilo');
    const prices = await productPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  test('Should sort products by name (A-Z)', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.sortProducts('az');
    const names = await productPage.getProductNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
  });

  test('Should sort products by name (Z-A)', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.sortProducts('za');
    const names = await productPage.getProductNames();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedNames);
  });
});
