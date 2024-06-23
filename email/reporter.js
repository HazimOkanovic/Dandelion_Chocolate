import {Emailer} from "../email/emailer"

let onBeginString;
let onTestBeginString;
let onTestEndString;
let onEndString;
let allText = [];
let API_KEY = '6fc15d4ecaf1d32622270e9e948ae962-6fafb9bf-cd3e85e5';
let DOMAIN = 'sandbox40580acd4be04e99bdbbe938cd3b851f.mailgun.org';

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: API_KEY});
class MyReporter {
    onBegin(config, suite) {
      onBeginString = `Starting the run with ${suite.allTests().length} tests`
      allText.push(onBeginString);
    }
  
    onTestBegin(test) {
      onTestBeginString = `Starting test ${test.title}`
      allText.push(onTestBeginString)
    }
  
    onTestEnd(test, result) {
      onTestEndString = `Finished test ${test.title}: ${result.status}`
      allText.push(onTestEndString)
    }
  
    onEnd(result) {
      onEndString = `Finished the run: ${result.status}`
      allText.push(onEndString)
      let emailer = new Emailer()
      emailer.main(allText);
      console.log(allText)
      mg.messages.create(DOMAIN, {
        from: "hazimokanovic258@gmail.com",
        to: ["hazim@dandelionchocolate.com"],
        subject: "Hello",
        text: allText
      })
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  }
}
module.exports = MyReporter;


