import { expect, test } from "@playwright/test";
import { EventsPage } from "../pages/eventsPage";
import { Data, PagesUrls } from "../testData/data";

let page;
let context;

test.beforeAll(async ({ browser, baseURL }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(PagesUrls.eventsPage);
});

test('Dandelion Night events test',async () => {
    await expect(await page.url()).toMatch(PagesUrls.eventsPage)
    let eventsPage = new EventsPage(page);
    let allEvents = [];
    for (let index = 0; index < await eventsPage.dateNightEvents.count(); index++) {
        const element = await eventsPage.dateNightEvents.nth(index);
        allEvents.push(element);
    }
           
    for (const event of allEvents) {
        await event.click();
        expect(await eventsPage.modalHeader).toHaveText(Data.dateNightHeader);
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), 
            await eventsPage.bookNowButton.click()
            ])
        await newPage.waitForTimeout(13000);
        await expect(newPage.locator("//div[@class='Consumer-reservationInfo']//h3[contains(text(), 'Date Night')]")).toHaveText(Data.dateNightHeader);
        await expect(newPage.locator("(//button[@data-testid='booking-card-button'])[1]")).toBeVisible({timeout: 3000});
        await expect(newPage.locator("//div[@class='MuiTypography-root css-i77tdi']")).not.toBeAttached({timeout: 3000});
        await expect(newPage.locator("//div[@class='MuiTypography-root css-i77tdi']")).toBeHidden({timeout: 3000});
                
        await newPage.close()
        await eventsPage.clickXModal();
    }
});