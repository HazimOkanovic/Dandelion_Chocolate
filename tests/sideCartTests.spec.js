import { test, expect } from "@playwright/test";
import { Header } from "../pages/header";
import { ShopPage } from "../pages/shopPage";
import { ProductPage } from "../pages/productPage";
import { CartSidePanel } from "../pages/cartSidePanel";
import { Data, PagesUrls } from "../testData/data";

let page;
let context;

test.beforeAll(async ({ browser, baseURL }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(`${baseURL}`);
});

test('Side cart panel tests', async () => {
    let headerPage = new Header(page);
    let shopPage = new ShopPage(page);
    let productPage = new ProductPage(page);
    let cartSidePanel = new CartSidePanel(page);

    await headerPage.clickShopLink();
    await expect(page.url()).toMatch(PagesUrls.shopPage);

    await shopPage.clickOnProduct(Data.halvaBonbons);
    await expect(page.url()).toMatch(PagesUrls.halvaBonbonsPage);
    await page.waitForTimeout(2000)
    await productPage.clickAddToCartButton();
        
    await expect(cartSidePanel.productNameInCartSidePanel).toHaveText(Data.halvaBonbons)
    await expect(cartSidePanel.productPriceInCartSidePanel).toHaveText("$45")

    await cartSidePanel.clickXButton();
    await productPage.clickAddToCartButton();

    await expect(cartSidePanel.productNameInCartSidePanel).toHaveText(Data.halvaBonbons)
    await expect(cartSidePanel.productPriceInCartSidePanel).toHaveText("$90")

    await cartSidePanel.clickXButton();
    await productPage.clickPlusButton();
    await productPage.clickAddToCartButton();

    await expect(cartSidePanel.productNameInCartSidePanel).toHaveText(Data.halvaBonbons)
    await expect(cartSidePanel.productPriceInCartSidePanel).toHaveText("$180")

    await cartSidePanel.clickRemoveButton();
    await page.waitForTimeout(2000)
    await cartSidePanel.clickXButton();
    await productPage.clickPlusButton();
    await productPage.clickAddToCartButton();
    await expect(cartSidePanel.productNameInCartSidePanel).toHaveText(Data.halvaBonbons)
    await expect(cartSidePanel.productPriceInCartSidePanel).toHaveText("$135")

    await cartSidePanel.clickProductLink();
    await expect(page.url()).toMatch(PagesUrls.halvaBonbonsRedirectedPage);

    await productPage.clickPlusButton();
    await productPage.clickAddToCartButton();
    await expect(cartSidePanel.productNameInCartSidePanel).toHaveText(Data.halvaBonbons)
    await expect(cartSidePanel.productPriceInCartSidePanel).toHaveText("$225")

    await cartSidePanel.clickXButton();
    await productPage.clickMinusButton();
    await productPage.clickAddToCartButton();
    await expect(cartSidePanel.productNameInCartSidePanel).toHaveText(Data.halvaBonbons)
    await expect(cartSidePanel.productPriceInCartSidePanel).toHaveText("$270")

    await cartSidePanel.clickMinusButton();
    await page.waitForTimeout(2000)
    await expect(cartSidePanel.productNameInCartSidePanel).toHaveText(Data.halvaBonbons)
    await expect(cartSidePanel.productPriceInCartSidePanel).toHaveText("$225")

    await cartSidePanel.clickPlusButton();
    await page.waitForTimeout(2000)
    await cartSidePanel.clickPlusButton();
    await page.waitForTimeout(2000)
    await expect(cartSidePanel.productNameInCartSidePanel).toHaveText(Data.halvaBonbons)
    await expect(cartSidePanel.productPriceInCartSidePanel).toHaveText("$315")
});