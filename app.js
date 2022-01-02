require('dotenv').config();
require('./config/mongodb');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const Email = require('./models/user.model');
const sendEmail = require('./config/mailer');

app.use(express.json());

app.post('/api/v1/verify', async (req, res) => {
  const { email } = req.body;
  const found = await Email.findOne({ email });

  if (found) {
    if (found.status === 'Active') {
      return res.status(200).json({
        message: 'You are already subscribed!',
      });
    } else {
      return res.status(200).json({
        message: 'Link has already been sent to you!',
      });
    }
  }

  const newEmail = new Email({ email });
  try {
    const sent = await sendEmail(email);
    await newEmail.save();
    console.log(sent);
    res.status(200).json({
      message: 'Email sent!',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong!',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
