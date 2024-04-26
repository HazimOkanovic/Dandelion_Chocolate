exports.HomePage = class HomePage {

    constructor(page) {
        this.page = page;
        this.cartButton = page.locator("//div[@class = 'thb-secondary-item-icon']");
    }
}