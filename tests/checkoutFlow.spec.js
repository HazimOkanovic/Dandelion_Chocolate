import { test, expect } from "@playwright/test";
import { ShopPage } from "../pages/shopPage";
import { ProductPage } from "../pages/productPage";
import { CartSidePanel } from "../pages/cartSidePanel";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { Data, PagesUrls } from "../testData/data";
import { EmailPage } from "../pages/emailPage";
import { Header } from "../pages/header";

let page;
let secondPage;

test.beforeAll(async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(`${baseURL}`);
});

test.describe('Check the checkout flow', {tag: '@regression'}, () => {
    test.describe.configure({ mode: 'serial' });
    test('Go to the shop page',async () => {
        let headerPage = new Header(page);
        await headerPage.clickShopLink();
        
        expect(await page.url()).toMatch(PagesUrls.shopPage); 
    });

    test('Choose the product and verify',async () => {
        let shopPage = new ShopPage(page);
        await shopPage.clickOnProduct(Data.hanamiCollection);
        
        expect(await page.url()).toMatch(PagesUrls.hanamiCollectionPage); 
    });

    test('Click add to cart button and verify the price and the name in the cart side panel',async () => { 
        let productPage = new ProductPage(page);
        let cartSidePanel = new CartSidePanel(page);   
        await productPage.clickAddToCartButton();
        
        expect(await cartSidePanel.hanamiProductNameInCartSidePanel).toHaveText(Data.hanamiCollection)
        expect(await cartSidePanel.hanamiProductPriceInCartSidePanel).toHaveText(Data.hanamiCollectionPriceWithoutZeros)
    })

    test('Click checkout button and verify the price, the name, and total price in the cart',async () => {
        let cartSidePanel = new CartSidePanel(page);
        let cartPage = new CartPage(page);
        
        await cartSidePanel.clickCheckoutButton();
        
        expect(await cartPage.productName).toHaveText(Data.hanamiCollection);
        expect(await cartPage.productPrice).toHaveText(Data.hanamiCollectionPriceWithoutZeros);
        expect(await cartPage.totalPrice).toHaveText(Data.hanamiCollectionTotalPriceCart)
    })

    test('Click checkout button and verify the price, the name, and the total price on the checkout page',async () => {
        let cartPage = new CartPage(page);
        let checkoutPage = new CheckoutPage(page);

        await page.waitForTimeout(6000);
        await cartPage.clickCheckoutButton();
        
        expect(await checkoutPage.productName).toHaveText(Data.hanamiCollection);
        expect(await checkoutPage.productPrice).toContainText(Data.hanamiCollectionPriceWithoutZeros);
        expect(await checkoutPage.totalPrice).toContainText(Data.hanamiCollectionPriceWithoutZeros)
    })

    test('Enter all info on the checkout page',async () => {
        let checkoutPage = new CheckoutPage(page);

        await page.waitForTimeout(10000);
        await checkoutPage.enterEmail(Data.userEmail);
        await checkoutPage.enterFirstName(Data.firstName);
        await checkoutPage.enterLastName(Data.lastName);
        await checkoutPage.enterAddress(Data.address);
        await checkoutPage.enterCity(Data.city);
        await checkoutPage.chooseState(Data.cali);
        await checkoutPage.enterZipCode(Data.zipCode);
        await checkoutPage.enterPhoneNumber(Data.phoneNumber);
        await checkoutPage.clickContinueButton();
        
        expect(await checkoutPage.productName).toHaveText(Data.hanamiCollection);
        expect(await checkoutPage.productPrice).toContainText(Data.hanamiCollectionPriceWithoutZeros);
        expect(await checkoutPage.totalPrice).toContainText(Data.hanamiCollectionPriceWithoutZeros);
        expect(await checkoutPage.mainHeader).toHaveText(Data.shippingMethod);
    })

    test('Enter the coupon on the checkout page',async () => {
        let checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCoupon(Data.coupon);
        await checkoutPage.clickApplyCoupon();
        
        expect(await checkoutPage.totalPrice).toContainText(Data.zeroPrice);
    })

    test('Continue to payment',async () => {
        let checkoutPage = new CheckoutPage(page);

        await checkoutPage.clickContinueButton();
        
        expect(await checkoutPage.paymentInfo).toHaveText(Data.freeOrderMessage);
    })

    test('Complete the order',async () => {
        let checkoutPage = new CheckoutPage(page);

        await checkoutPage.clickCompleteOrderButton();
        await expect(await checkoutPage.completeOrderMessage).toHaveText(Data.thankYouMessage, { timeout: 20000 });
    })

    test('Verify email confirmation and cancel the order',async ({context}) => {
        secondPage = await context.newPage();       
        let emailPage = new EmailPage(secondPage); 
        
        await emailPage.verifyReceivedEmail();
    })
});