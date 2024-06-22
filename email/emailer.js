import * as nodemailer from 'nodemailer'

let transporter;
exports.Emailer = class Emailer {
  
async main(addedFile) {
  var today = new Date();
  let todayFormatted = [today.getDate(), today.getMonth() + 1, today.getFullYear()].join('/');
  
  transporter = nodemailer.createTransport({
    service: 'gmail',
    port:465,
    secure: true,
    secureConnection: false,
    auth: {
            user: 'hazimokanovic258@gmail.com',
            pass: 'euoo yxxz xxbl qhff', 
          },
          tls:{
                rejectUnAuthorized:true
              }
  });
     transporter.sendMail({
      from: '"Hazim Okanovic" <hazimokanovic258@gmail.com>', // sender address
      to: "hazim@dandelionchocolate.com",  // list of receivers
      subject: "Daily Regression Report", // Subject line
      text: "Hello! Here is the regression report for " + todayFormatted +". \nPlease download the index.html file to see the full report. \nThanks and take care. :)" + addedFile
    });
  }
}