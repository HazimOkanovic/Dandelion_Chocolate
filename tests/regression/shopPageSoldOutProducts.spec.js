import { test } from "@playwright/test";
import { ShopPage } from "../../pages/shopPage";

test.skip('Check if there is sold out product in the shop page', {tag: '@regression'}, async ({ page }) => {
    await page.goto("https://www.dandelionchocolate.com/pages/shop");
    let shopPage = new ShopPage(page);
    let products_number;
    let add_to_cart_number;
    for (let i = 0; i < await shopPage.products.count(); i++) {
        products_number = await shopPage.products.count();
      }
    for (let i = 0; i < await shopPage.quickAddToCartButtons.count(); i++) {
        add_to_cart_number = await shopPage.quickAddToCartButtons.count();
      }  
    if(products_number != add_to_cart_number){
        for (let i = 0; i < await shopPage.soldOutProductName.count(); i++) {
            const element = await shopPage.soldOutProductName.nth(i);
            console.log(await element.textContent())
            test.fail();
          }
    }
})