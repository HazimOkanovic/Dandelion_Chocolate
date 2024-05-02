exports.ProductPage = class ProductPage {

    constructor(page) {
        this.page = page;
        this.allParagraphs = page.locator("//p");
        this.addToCartButton = page.locator("//button[@name='add']");
        this.priceOnButton = page.locator("//button[@name='add']//span[@class='product-price-container product__price-main']");
    }

    async clickAddToCartButton(){
        await this.addToCartButton.click();
    }

    async getPriceFromButton(){
        await this.priceOnButton.textContent();
    }
}