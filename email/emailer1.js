let API_KEY = 'pubkey-82d436afc105a9249ff4b2e8cd9feb39';
let DOMAIN = 'sandbox40580acd4be04e99bdbbe938cd3b851f.mailgun.org';
const mailgun = require('mailgun-js')
    ({ apiKey: API_KEY, domain: DOMAIN });
 
sendMail = function (sender_email, receiver_email,
    email_subject, email_body) {
 
    const data = {
        "from": sender_email,
        "to": receiver_email,
        "subject": email_subject,
        "text": email_body
    };
 
    mailgun.messages().send(data, (error, body) => {
        if (error) console.log(error)
        else console.log(body);
    });
}
 
let sender_email = 'hazimokanovic258@gmail.com'
let receiver_email = 'hazim@dandelionchocolate.com'
let email_subject = 'Mailgun Demo'
let email_body = 'Greetings from geeksforgeeks'
 
// User-defined function to send email
sendMail(sender_email, receiver_email,
    email_subject, email_body)