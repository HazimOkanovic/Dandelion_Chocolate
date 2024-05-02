exports.CartSidePanel = class CartSidePanel {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("//a[@title='View Cart']");
        this.productPriceInCartSidePanel = page.locator("//div[@class='product-cart-item-info']//a[@title='Hanami Collection']//parent::div//following-sibling::div//child::div[@class='pn-total-line-item']");
        this.productNameInCartSidePanel = page.locator("//div[@class='product-cart-item-info']//a[@title='Hanami Collection']");
    }

    async clickCheckoutButton(){
        await this.checkoutButton.click();
    }
}