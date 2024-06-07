exports.CartSidePanel = class CartSidePanel {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("//a[@title='View Cart']");
        this.hanamiProductPriceInCartSidePanel = page.locator("//div[@class='product-cart-item-info']//a[@title='Hanami Collection']//parent::div//following-sibling::div//child::div[@class='pn-total-line-item']");
        this.hanamiProductNameInCartSidePanel = page.locator("//div[@class='product-cart-item-info']//a[@title='Hanami Collection']");
        this.halvaProductPriceInCartSidePanel = page.locator("//div[@class='product-cart-item-info']//a[@title='Halva Bonbons']//parent::div//following-sibling::div//child::div[@class='pn-total-line-item']");
        this.halvaProductNameInCartSidePanel = page.locator("//div[@class='product-cart-item-info']//a[@title='Halva Bonbons']");
        this.hcProductPriceInCartSidePanel = page.locator("//div[@class='product-cart-item-info']//a[@title='Hot Chocolate Mix Trio']//parent::div//following-sibling::div//child::div[@class='pn-total-line-item']");
        this.hcProductNameInCartSidePanel = page.locator("//div[@class='product-cart-item-info']//a[@title='Hot Chocolate Mix Trio']");
        this.unitNumber = page.locator("//input[@name = 'updates[]']");
        this.xButton = page.locator("(//side-panel-close[@class = 'side-panel-close'])[1]");
        this.removeButton = page.locator("//a[text() = 'Remove']");
        this.productLink = page.locator("//div[@class='product-cart-item-info']//a[@class='cart-product-link']");
        this.minusButton = page.locator("//quantity-selector[@class='quantity cart-update small-qty buttons_added']//button[@class='minus']");
        this.plusButton = page.locator("//quantity-selector[@class='quantity cart-update small-qty buttons_added']//button[@class='plus']")
    }

    async clickCheckoutButton(){
        await this.checkoutButton.click();
    }

    async clickXButton(){
        await this.xButton.click();
    }

    async clickRemoveButton(){
        await this.removeButton.click();
    }

    async clickProductLink(){
        await this.productLink.click();
    }

    async clickPlusButton(){
        await this.plusButton.click();
    }

    async clickMinusButton(){
        await this.minusButton.click();
    }
}