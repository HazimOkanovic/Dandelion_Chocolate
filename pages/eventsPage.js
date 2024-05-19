import { expect } from '@playwright/test'

exports.EventsPage = class EventsPage {
    constructor(page){
        this.page = page;
        this.factoryTourEvents = page.locator("//div[contains(text(),  'Factory Tour')]//ancestor::a");
        this.chocolateMakingEvents = page.locator("//div[contains(text(),  'Chocolate Making')]//ancestor::a");
        this.chocolateTastingEvents = page.locator("//div[contains(text(),  'Chocolate Tasting')]//ancestor::a");
        this.dateNightEvents = page.locator("//div[contains(text(),  'Date Night')]//ancestor::a");
        this.truffleMakingEvents = page.locator("//div[contains(text(),  'Truffle Making')]//ancestor::a");
        this.modalHeader = page.locator("//div[@class = 'jsx-1119884723 eapp-events-calendar-popup-item-name']");
        this.bookNowButton = page.locator("//div[text() = 'Book Now']");
        this.xButtonModal = page.locator("//div[@class='jsx-3505593432 eapp-events-calendar-close-component eapp-events-calendar-popup-item-close']");
    }

    async clickXModal(){
        await this.xButtonModal.click();
    }

    async checkIfEventIsSoldOut(){
        const [newPage] = await Promise.all([
            this.page.waitForEvent('page'), 
            await this.bookNowButton.click()
          ])
        await this.page.waitForTimeout(13000);
        expect(await newPage.locator("(//div[@class='Consumer-reservationInfo']//h3)[10]")).toHaveText("Date Night with Dandelion");
        
        await newPage.close()
    }
}