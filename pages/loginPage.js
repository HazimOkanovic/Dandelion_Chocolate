exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailInputField = page.locator("//input[@name='customer[email]']");
        this.passwordInputFiled = page.locator("//input[@name='customer[password]']");
        this.signInButton = page.locator("//button//span[text() = 'Sign in']");
        this.incorrectError = page.locator("//li[contains(., 'Incorrect')]");
    }

    async enterEmail(email){
        await this.emailInputField.click();
        await this.emailInputField.fill(email);
    }

    async enterPassword(password){
        await this.passwordInputFiled.click();
        await this.passwordInputFiled.fill(password);
    }

    async clickSignInButton(){
        await this.signInButton.click();
    }
}