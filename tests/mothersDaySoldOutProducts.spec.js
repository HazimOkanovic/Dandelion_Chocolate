import { test } from "@playwright/test";
import { MothersDayPage } from "../pages/mothersDayPage";

test('Check if there is sold out product in the Mothers Day Collection', async ({ page }) => {
    await page.goto("https://www.dandelionchocolate.com/collections/mothers-day");
    let mothersDayPage = new MothersDayPage(page);
    let products_number;
    let add_to_cart_number;
    for (let i = 0; i < await mothersDayPage.products.count(); i++) {
        products_number = await mothersDayPage.products.count();
      }
    for (let i = 0; i < await mothersDayPage.quickAddToCartButtons.count(); i++) {
        add_to_cart_number = await mothersDayPage.quickAddToCartButtons.count();
      }  
    if(products_number != add_to_cart_number){
        for (let i = 0; i < await mothersDayPage.soldOutProductName.count(); i++) {
            const element = await mothersDayPage.soldOutProductName.nth(i);
            console.log(await element.textContent())
            test.fail();
          }
    }
})