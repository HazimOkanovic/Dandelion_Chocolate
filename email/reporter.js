import {Emailer} from "../email/emailer"

let onBeginString;
let onTestBeginString;
let onTestEndString;
let onEndString;
let allText = []
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
}
}
module.exports = MyReporter;