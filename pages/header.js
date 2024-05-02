exports.Header = class Header {

    constructor(page) {
        this.page = page;
        this.shopAllLink = page.locator("(//a[@title='Shop'])[1]");
    }

    async clickShopLink(){
        await this.shopAllLink.click();
    }
}