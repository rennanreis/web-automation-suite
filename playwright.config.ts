import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com/',
    headless: true,
    screenshot: 'only-on-failure'
  }
});
