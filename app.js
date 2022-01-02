require('dotenv').config();
require('./config/mongodb');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const Email = require('./models/user.model');

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
    await newEmail.save();
    
  res.status(200).json({
    message: 'Link has already been sent to you!',
  });

  // step 1: Save email to database with default status and expiry date
  // step 2: Send an email with confirmation link
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
