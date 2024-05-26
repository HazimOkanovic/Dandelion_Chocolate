exports.ProductPage = class ProductPage {

    constructor(page) {
        this.page = page;
        this.allParagraphs = page.locator("//p");
        this.addToCartButton = page.locator("(//span[text() = 'Add to cart '])[1]");
        this.priceOnButton = page.locator("//button[@name='add']//span[@class='product-price-container product__price-main']");
        this.plusButton = page.locator("//div[@id='quantity-template--16459367153804__main-product']//button[@class='plus']");
        this.minusButton = page.locator("//div[@id='quantity-template--16459367153804__main-product']//button[@class='minus']")
    }

    async clickAddToCartButton(){
        await this.addToCartButton.click();
    }

    async getPriceFromButton(){
        await this.priceOnButton.textContent();
    }

    async clickPlusButton(){
        await this.plusButton.click();
    }

    async clickMinusButton(){
        await this.minusButton.click();
    }
}