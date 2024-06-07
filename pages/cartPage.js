exports.CartPage = class CartPage {
    constructor(page){
        this.page = page;
        this.productName = page.locator("(//a[@title = 'Hanami Collection'])[2]");
        this.hcProductName = page.locator("(//a[@title = 'Hot Chocolate Mix Trio'])[2]");
        this.hcProductPrice = page.locator("//a[@title='Hot Chocolate Mix Trio']//ancestor::td[@class='product-name']//following::td[@class='product-subtotal']//span//ins");
        this.productPrice = page.locator("//a[@title='Hanami Collection']//ancestor::td[@class='product-name']//following::td[@class='product-subtotal']//span//ins");
        this.totalPrice = page.locator("//div[@class='cart__footer--right hide-mobile']//div[@class = 'subtotal']");
        this.checkoutButton = page.locator("//button[@name= 'checkout']");
        this.minusButton = page.locator("(//button[@class = 'minus'])[2]");
        this.plusButton = page.locator("(//button[@class = 'plus'])[2]");
        this.quantityInputField = page.locator("(//input[@type = 'number'])[2]");
        this.quantityHeader = page.locator("//th[text() = 'Quantity']");
    }

    async clickCheckoutButton(){
        await this.checkoutButton.click();
    }

    async clickPlusButton(){
        await this.plusButton.click({force: true});
        await this.quantityHeader.click({force: true});
    }

    async clickMinusButton(){
        await this.minusButton.click({force: true});
        await this.quantityHeader.click({force: true});
    }

    async enterQuantityNumber(number){
        await this.quantityInputField.clear();
        await this.quantityInputField.fill(number);
        await this.quantityHeader.click({force: true});
    }
}