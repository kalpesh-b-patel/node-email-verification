const mongoose = require('mongoose');

const utcDate = () => new Date();

const Email = mongoose.model(
  'Email',
  new mongoose.Schema({
    email: String,
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending',
    },
    expiresAt: {
      type: Date,
      default: utcDate().setUTCDate(utcDate().getUTCDate() + 1),
    },
  })
);

module.exports = Email;
