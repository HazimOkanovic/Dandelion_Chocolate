import { expect } from '@playwright/test'
import { Data } from '../testData/data';

export class EmailPage {
  
  constructor(page) {
    this.page = page;
    this.confirmationEmail = page.locator("//div[@class='email-list table-box']//div[contains(*, 'confirmed')]")
    this.productTitle = page.locator("//span[contains(., 'Hanami')]");
    this.productPrice = page.locator("//p[contains(., '75')]");
    this.totalPrice = page.locator("(//td[@class='subtotal-line__value']//span[contains(., '0.00')])[5]");
    this.cancelLink = page.locator("//a[text() = 'Cancel']");
    this.emailTitle = page.locator("//div[@class='row-name']");
    this.refreshButton = page.locator("//button[@class='refresh']");
}

  async verifyReceivedEmail(){
    await this.page.goto("https://inboxkitten.com/inbox/" + Data.name+"/list");
    await this.page.waitForTimeout(10000);
    await this.refreshButton.click();
    await expect(await this.emailTitle).toContainText(Data.ordersEmailConfirmation);
    await this.emailTitle.click();
    const iframe = await this.page.frameLocator("#message-content");
    
    await expect(await iframe.locator("//span[contains(., 'Hanami')]")).toHaveText(Data.hanamiCollectionEmail, {timeout: 20000});
    await expect(await iframe.locator("//p[@class='order-list__item-price']")).toContainText(Data.hanamiCollectionPrice);
    await expect(await iframe.locator("(//td[@class='subtotal-line__value']//span[contains(., '0.00')])[3]")).toContainText(Data.zeroPrice);

    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'), 
      await iframe.locator("//a[text() = 'Cancel']").click()
    ])

    await newPage.waitForLoadState();

    await newPage.locator("#cffOrderCancelButton").click();
    await newPage.locator("#cffModalModalConfirmButton").click();
    await newPage.waitForTimeout(10000);
    await expect(await newPage.locator("//div[@id='cffOrderEditingPageOrderCancelledAlert']//h4")).toHaveText(Data.orderCancelledConfirmation);
    await newPage.close();
    await this.page.close();
  }

  get emailConfirmation(){
    return this.page.locator("//div[@class='row-name']");
  }

  async openConfirmationEmail(){
    await this.confirmationEmail.click();
  }

  async clickCancelLink(){
    this.cancelLink.click();
  }

  async clickConfirmCancelLink(){
    this.confirmCancel.click();
  }
}