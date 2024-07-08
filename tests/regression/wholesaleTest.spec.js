import { test, expect } from "@playwright/test";
import { Data, PagesUrls } from "../../testData/data";
import { Header } from "../../pages/header";
import { WholesalePage } from "../../pages/wholesalePage";

let page;
let newPage;

test.beforeAll(async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(`${baseURL}`);
});

test.describe('Wholesale tests', {tag: '@regression'}, () => {
    test.describe.configure({ mode: 'serial' });
    test('Go to the wholesale page',async () => {
        let headerPage = new Header(page);
        await headerPage.clickMoreLink();
        [newPage] = await Promise.all([
            page.waitForEvent('popup'), 
            await headerPage.wholeSaleLink.click()
          ])
        await newPage.waitForLoadState();
        let wholesalePage = new WholesalePage(newPage);  
        await expect(wholesalePage.loginHeader).toHaveText(Data.wholeSaleHeader);
    });

    test('Login and verify that the user is logged in',async () => {
        let wholesalePage = new WholesalePage(newPage); 
        await wholesalePage.enterEmail(Data.dandelionEmail);
        await wholesalePage.enterPassword(Data.password)
        await wholesalePage.clickLoginButton();

        await expect(wholesalePage.loginHeader).toHaveText(Data.wholeSaleHeader);
    });

    test.skip("Check if the bars' links are working and if they are sold out",async () => {
        let wholesalePage = new WholesalePage(newPage);
        let products = [];
        let productNames = [];
        for (let index = 0; index < await wholesalePage.allBarProducts.count(); index++) {
            const element = await wholesalePage.allBarProducts.nth(index);
            products.push(element);
        } 
        for (const item of products) {
            await item.click();
            productNames.push(await wholesalePage.barProductNames.textContent());
            expect(await wholesalePage.addToCartButtonText).toHaveText(Data.addToCartWholeSale)
            await newPage.goBack();
        }
        expect(await productNames).toEqual(Data.wholeSaleBars)
    })

    test.skip("Check if other products' links are working and if they are sold out",async () => {
        let wholesalePage = new WholesalePage(newPage);
        let products = [];
        let productNames = [];

        for (let index = 0; index < await wholesalePage.shopNowButtons.count(); index++) {
            const element = await wholesalePage.shopNowButtons.nth(index);
            products.push(element);
        } 
        for (const item of products) {
            await item.click();
            productNames.push(await wholesalePage.otherProductNames.textContent());
            expect(await wholesalePage.addToCartButtonText).toHaveText(Data.addToCartWholeSale)
            await newPage.goBack();
        }
        expect(await productNames).toEqual(Data.otherWholeSaleProducts)
    })
});