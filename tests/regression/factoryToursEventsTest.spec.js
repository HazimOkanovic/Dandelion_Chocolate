import { expect, test } from "@playwright/test";
import { EventsPage } from "../../pages/eventsPage";
import { Data, PagesUrls } from "../../testData/data";

let page;
let context;

test.beforeAll(async ({ browser, baseURL }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(PagesUrls.eventsPage);
});

test.skip('Factory tour events test', {tag: '@regression'}, async () => {
    test.setTimeout(8000000);
    await expect(await page.url()).toMatch(PagesUrls.eventsPage)
    let eventsPage = new EventsPage(page);
    let allEvents = [];
    for (let index = 0; index < await eventsPage.factoryTourEvents.count(); index++) {
        const element = await eventsPage.factoryTourEvents.nth(index);
        allEvents.push(element);
    }
       
    for (const event of allEvents) {
        await event.click();
        expect(await eventsPage.modalHeader).toContainText(Data.factoryTour);
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), 
            await eventsPage.bookNowButton.click()
            ])
        await newPage.waitForTimeout(13000);
        await expect(newPage.locator("//div[@class='Consumer-reservationInfo']//h3[contains(text(), 'Tour')]")).toHaveText(Data.factoryTourHeader);
        await expect(newPage.locator("//div[@class='MuiTypography-root css-i77tdi']")).not.toBeAttached({timeout: 3000});
        await expect(newPage.locator("//div[@class='MuiTypography-root css-i77tdi']")).toBeHidden({timeout: 3000});
                        
        await newPage.close()
        await eventsPage.clickXModal();
    }
});