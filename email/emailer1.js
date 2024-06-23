let API_KEY = 'pubkey-82d436afc105a9249ff4b2e8cd9feb39';
let DOMAIN = 'sandbox40580acd4be04e99bdbbe938cd3b851f.mailgun.org';

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || API_KEY});

mg.messages.create('sandbox-123.mailgun.org', {
	from: "hazimokanovic258@gmail.com",
	to: ["hazim@dandelionchocolate.com"],
	subject: "Hello",
	text: "Testing some Mailgun awesomeness!",
	html: "<h1>Testing some Mailgun awesomeness!</h1>"
})
.then(msg => console.log(msg)) // logs response data
.catch(err => console.log(err)); 

exports.Emailer1 = class Emailer1{
	
}