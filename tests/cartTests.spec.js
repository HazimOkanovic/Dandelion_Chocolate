import { test, expect } from "@playwright/test";
import { Header } from "../pages/header";
import { ShopPage } from "../pages/shopPage";
import { ProductPage } from "../pages/productPage";
import { CartSidePanel } from "../pages/cartSidePanel";
import { CartPage } from "../pages/cartPage";
import { Data, PagesUrls } from "../testData/data";

let page;
let context;

test.beforeAll(async ({ browser, baseURL }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(`${baseURL}`);
});

test('Cart page tests', async () => {
    let headerPage = new Header(page);
    let shopPage = new ShopPage(page);
    let productPage = new ProductPage(page);
    let cartSidePanel = new CartSidePanel(page);
    let cartPage = new CartPage(page);

    await headerPage.clickShopLink();
    await expect(page.url()).toMatch(PagesUrls.shopPage);

    await shopPage.clickOnProduct(Data.hcMixTrio);
    await expect(page.url()).toMatch(PagesUrls.hcMixTrio);
    await page.waitForTimeout(4000)
    await productPage.clickAddToCartButton();
        
    await expect(cartSidePanel.hcProductNameInCartSidePanel).toHaveText(Data.hcMixTrio)
    await expect(cartSidePanel.hcProductPriceInCartSidePanel).toHaveText("$65")

    await cartSidePanel.clickCheckoutButton();
    await page.waitForTimeout(3000);
    
    expect(await cartPage.hcProductName).toHaveText(Data.hcMixTrio);
    expect(await cartPage.hcProductPrice).toHaveText("$65");
    expect(await cartPage.totalPrice).toHaveText("Subtotal $65");

    await cartPage.enterQuantityNumber("5");
    await page.waitForTimeout(5000);

    expect(await cartPage.hcProductName).toHaveText(Data.hcMixTrio);
    expect(await cartPage.hcProductPrice).toHaveText("$325");
    expect(await cartPage.totalPrice).toHaveText("Subtotal $325");

    await cartPage.enterQuantityNumber("3");
    await page.waitForTimeout(5000);

    expect(await cartPage.hcProductName).toHaveText(Data.hcMixTrio);
    expect(await cartPage.hcProductPrice).toHaveText("$195");
    expect(await cartPage.totalPrice).toHaveText("Subtotal $195");

    await cartPage.clickMinusButton();
    await page.waitForTimeout(5000);

    expect(await cartPage.hcProductName).toHaveText(Data.hcMixTrio);
    expect(await cartPage.hcProductPrice).toHaveText("$130");
    expect(await cartPage.totalPrice).toHaveText("Subtotal $130");

    await cartPage.clickPlusButton();
    await page.waitForTimeout(5000);

    expect(await cartPage.hcProductName).toHaveText(Data.hcMixTrio);
    expect(await cartPage.hcProductPrice).toHaveText("$195");
    expect(await cartPage.totalPrice).toHaveText("Subtotal $195");
});