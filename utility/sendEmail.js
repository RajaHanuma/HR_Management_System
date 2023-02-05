require('dotenv').config();
const nodemailer = require('nodemailer');

exports.sendEmail = async (data) => {
  return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 25,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "rajahanumamanam@gmail.com", // Sender address
      to: data.email, // List of recipients
      subject: "OTP for your Login", // Subject line
      html:
      `<div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${data.otp}</h1>
   </div>`, // Plain text body
    };
    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(true);
        console.log(info);
      }
    });
  });
};
