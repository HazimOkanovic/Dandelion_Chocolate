import {test} from "@playwright/test"
import {Emailer} from "../../email/emailer"
import {setTimeout} from "node:timers/promises";

let page;
let context;

test.beforeAll(async ({ browser, baseURL }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(`${baseURL}`);
});

test("Send report email", {tag: '@sendEmail'}, async(page)=>{
    let emailer = new Emailer();
    await emailer.main();
})