const mongoose = require('mongoose');
const status = require('../utils/constants');

const Cleancode = mongoose.model(
  'Cleancode',
  new mongoose.Schema({
    email: String,
    status: {
      type: String,
      default: status.pending,
    },
    token: String,
    expiresAt: Date,
  })
);

module.exports = Cleancode;
