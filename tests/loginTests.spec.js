import { test, expect } from "@playwright/test";
import { Header } from "../pages/header";
import { LoginPage } from "../pages/loginPage";
import { PagesUrls } from "../testData/data";

let page;
let context;

test.beforeAll(async ({ browser, baseURL }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(`${baseURL}`);
});

test('Login tests', {tag: '@regression'}, async () => {
    const headerPage = new Header(page);
    const loginPage = new LoginPage(page);
    
    await headerPage.clickMyTitle();
    await expect(page.url()).toMatch(PagesUrls.loginPage);

    await page.waitForTimeout(3000);
    await loginPage.enterEmail("some.email@gmail.com");
    await loginPage.enterPassword("password");
    await loginPage.clickSignInButton();

    await expect(loginPage.incorrectError).toHaveText("Incorrect email or password.")

    await page.waitForTimeout(3000);
    await loginPage.enterEmail("some.email@gmail.com");
    await loginPage.clickSignInButton();

    await expect(loginPage.incorrectError).toHaveText("Incorrect email or password.")
});