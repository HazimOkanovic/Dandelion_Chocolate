import * as nodemailer from 'nodemailer';
let transporter;
let info;
exports.Emailer = class Emailer{
  
async main() {
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
      to: "hazim@dandelionchocolate.com", // list of receivers
      subject: "report", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }
}