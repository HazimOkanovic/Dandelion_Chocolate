exports.MothersDayPage = class MothersDayPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator("//div[@class='featured__collection--inner display-type--grid layout__type--grid hide-mobile']//figure//a");
        this.productTitles = page.locator("//div[@class='featured__collection--inner display-type--grid layout__type--grid hide-mobile']//figure//following-sibling::div[@class='product-card-info']//a")
        this.quickAddToCartButtons = page.locator("//div[@class='featured__collection--inner display-type--grid layout__type--grid hide-mobile']//figure//ancestor::button")
        this.soldOutMark = page.locator("//div[@class='featured__collection--inner display-type--grid layout__type--grid hide-mobile']//figure//span[@class = 'badge out-of-stock top left']")
        this.soldOutProductName = page.locator("//div[@class='featured__collection--inner display-type--grid layout__type--grid hide-mobile']//figure//span[@class = 'badge out-of-stock top left']//parent::figure//following-sibling::div//a")
    }
}