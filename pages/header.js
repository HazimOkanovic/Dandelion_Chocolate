exports.Header = class Header {

    constructor(page) {
        this.page = page;
        this.shopAllLink = page.locator("(//a[@title='Shop'])[1]");
        this.moreLink = page.locator("//a[@title='More']");
        this.wholeSaleLink = page.locator("//a[@title='Wholesale']");
        this.myAccount = page.locator("//a[@title='My Account']");
    }

    async clickShopLink(){
        await this.shopAllLink.click();
    }

    async clickMoreLink(){
        await this.moreLink.click();
    }

    async clickMyTitle(){
        await this.myAccount.click();
    }
}