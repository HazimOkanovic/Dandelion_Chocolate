exports.CheckoutPage = class CheckoutPage{
    constructor(page){
        this.page = page;
        this.productName = page.locator("//span[@class = 'product__description__name order-summary__emphasis']");
        this.productPrice = page.locator("//td[@class='product__price']");
        this.totalPrice = page.locator("//span[@class='payment-due__price skeleton-while-loading--lg']");
        this.emailInputField = page.getByPlaceholder("Email");
        this.firstNameInputField = page.getByPlaceholder("First name");
        this.lastNameInputField = page.getByPlaceholder("Last name");
        this.addressInputField = page.locator("//input[@id='checkout_shipping_address_address1']");
        this.cityInputField = page.getByPlaceholder("City");
        this.stateInputField = page.getByPlaceholder("State");
        this.zipCodeInputField = page.getByPlaceholder("Zip code");
        this.phoneNumberInputField = page.getByPlaceholder("Phone (optional)");
        this.continueButton = page.locator("#continue_button");
        this.couponInputField = page.getByPlaceholder("Discount code or gift card");
        this.applyCouponButton = page.locator("#checkout_submit");
        this.mainHeader = page.locator("#main-header");
        this.paymentInfo = page.locator("(//div[@class='content-box__row']//p)[2]");
        this.completeOrderButton = page.getByRole('button', { name: 'Complete order' });
        this.completeOrderMessage = page.locator('h2', {hasText: 'Hazim'});
    }

    async enterEmail(email){
        await this.emailInputField.fill(email);
    }

    async enterFirstName(firstName){
        await this.page.waitForTimeout(500);
        await this.firstNameInputField.fill(firstName);
    }

    async enterLastName(lastName){
        await this.page.waitForTimeout(500);
        await this.lastNameInputField.fill(lastName);
    }

    async enterAddress(address){
        await this.page.waitForTimeout(500);
        await this.addressInputField.fill(address);
    }

    async enterCity(city){
        await this.page.waitForTimeout(500);
        await this.cityInputField.fill(city);
    }

    async chooseState(state){
        await this.stateInputField.click();
        await this.stateInputField.selectOption({value: state});
    }

    async enterZipCode(zipCode){
        await this.page.waitForTimeout(500);
        await this.zipCodeInputField.fill(zipCode);
    }

    async enterPhoneNumber(phoneNumber){
        await this.page.waitForTimeout(500);
        await this.phoneNumberInputField.fill(phoneNumber);
    }

    async enterCoupon(coupon){
        await this.couponInputField.fill(coupon);
    }

    async clickApplyCoupon(){
        await this.applyCouponButton.click();
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

    async clickCompleteOrderButton(){
        await this.completeOrderButton.click();
    }
}