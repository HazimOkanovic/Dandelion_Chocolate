const { name } = require("../playwright.config");

exports.WholesalePage = class WholesalePage{
    constructor(page){
        this.loginHeader = page.locator("(//h1[contains(., 'Chocolate for Our Partners')])[1]");
        this.emailInputField = page.locator("#CustomerEmail");
        this.passwordInputField = page.locator("#CustomerPassword")
        this.loginButton = page.getByRole('button', { name: 'Log In' }); 
        this.allBarProducts = page.locator("//a[@class = 'shogun-image-link']//ancestor::div[@class= 'shg-c-lg-4 shg-c-md-4 shg-c-sm-4 shg-c-xs-12']");
        this.barProductNames = page.locator("//h1[@class = 'product__origin h1']");
        this.otherProductNames = page.locator("//h1[@class = 'product__title h2']");
        this.addToCartButton = page.getByRole('button', {name: 'add'});
        this.addToCartButtonText = page.locator("(//span[@class='primary-text']//span)[1]")
        this.shopNowButtons = page.locator("//a[text() = ' SHOP NOW ']")
    }

    async enterEmail(email){
        await this.emailInputField.fill(email);
    }

    async enterPassword(password){
        await this.passwordInputField.fill(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }    
}