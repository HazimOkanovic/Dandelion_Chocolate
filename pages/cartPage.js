exports.CartPage = class CartPage {
    constructor(page){
        this.page = page;
        this.productName = page.locator("(//a[@title = 'Hanami Collection'])[2]");
        this.productPrice = page.locator("//a[@title='Hanami Collection']//ancestor::td[@class='product-name']//following::td[@class='product-subtotal']//span//ins");
        this.totalPrice = page.locator("//div[@class='cart__footer--right hide-mobile']//div[@class = 'subtotal']");
        this.checkoutButton = page.locator("//button[@name= 'checkout']");
    }

    async clickCheckoutButton(){
        await this.checkoutButton.click();
    }
}