import { randomText } from "../utils";

const userName = randomText();

export const Data = {
    name : userName, 
    hanamiCollection : 'Hanami Collection',
    userEmail : userName+"@inboxkitten.com", 
    firstName : "Hazim",
    lastName : "Okanovic", 
    address : "California Academy of Sciences",
    city : "San Francisco",
    cali : "CA", 
    zipCode : "94118",
    phoneNumber : "+38762258766",
    shippingMethod : "Shipping method",
    coupon : "DCWEBTEST2024", 
    freeOrderMessage : "Your order is free. No payment is required.",
    thankYouMessage : "Thank you, Hazim!",
    ordersEmailConfirmation : "orders@dandelionchocolate.com",
    hanamiCollectionEmail : 'Hanami Collection × 1', 
    hanamiCollectionPrice: '$75.00', 
    hanamiCollectionPriceWithoutZeros : "$75", 
    hanamiCollectionTotalPriceCart: "Subtotal $75",
    zeroPrice: '$0.00', 
    orderCancelledConfirmation : 'Order Cancelled and Refunded.', 
}

export const PagesUrls = {
    shopPage : "https://www.dandelionchocolate.com/pages/shop",  
    hanamiCollectionPage : "https://www.dandelionchocolate.com/products/hanami-collection" 
}