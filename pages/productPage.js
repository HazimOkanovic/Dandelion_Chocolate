exports.ProductPage = class ProductPage {

    constructor(page) {
        this.page = page;
        this.allParagraphs = page.locator("//p");
    }
}