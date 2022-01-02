const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PWD,
  },
});

const sendEmail = async (email) => {
  const mailOptions = {
    from: `cleancode.blog ${process.env.GMAIL_EMAIL}`,
    to: email,
    subject: 'Please confirm email address',
    html: `<p>Email: ${email}</p>`,
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
