import { test, expect } from '../fixtures/fixtures';
import { ProductPage } from '../page-objects/ProductPage';

/**
 * Test suite for product search and sorting functionality.
 * Verifies that products are sorted correctly by name and price.
 */
test.describe('Product Search and Sorting', () => {
  test('Should sort products by price (low to high)', async ({ navigateToProducts, page }) => {
    await navigateToProducts(); // Agora já está logado e na tela de produtos
    const productPage = new ProductPage(page);
    await productPage.sortProductsBy('lohi');
    const prices = await productPage.getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('Should sort products by price (high to low)', async ({ navigateToProducts, page }) => {
    await navigateToProducts();
    const productPage = new ProductPage(page);
    await productPage.sortProductsBy('hilo');
    const prices = await productPage.getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  test('Should sort products by name (A-Z)', async ({ navigateToProducts, page }) => {
    await navigateToProducts();
    const productPage = new ProductPage(page);
    await productPage.sortProductsBy('az');
    const names = await productPage.getAllProductNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
  });

  test('Should sort products by name (Z-A)', async ({ navigateToProducts, page }) => {
    await navigateToProducts();
    const productPage = new ProductPage(page);
    await productPage.sortProductsBy('za');
    const names = await productPage.getAllProductNames();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedNames);
  });
});