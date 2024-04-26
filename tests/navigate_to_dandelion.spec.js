// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.dandelionchocolate.com/pages/shop');
});


test.describe('First test', () => {
  test('first navigatio', async ({ page }) => {
    await page.locator("(//a//img[@alt='Dandelion Chocolate Tokyo Gâteau'])[1]").click();

    await expect(page.url()).toMatch("https://www.dandelionchocolate.com/products/tokyo-gateaux");
  });
});
