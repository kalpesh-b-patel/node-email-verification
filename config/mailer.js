const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PWD,
  },
});

const sendEmail = async (email, token) => {
  const mailOptions = {
    from: `cleancode.blog ${process.env.GMAIL_EMAIL}`,
    to: email,
    subject: 'Please confirm email address',
    html: `
    <p>Thank you for your subscription</p>
    <p>Please confirm your email by clicking <a href="http://localhost:3002/api/v1/confirm?email=${email}&token=${token}" _target="blank">this</> link</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = sendEmail;
