const mongoose = require('mongoose');
const status = require('../utils/constants');

const Kpatel = mongoose.model(
  'Kpatel',
  new mongoose.Schema({
    email: String,
    status: {
      type: String,
      default: status.pending,
    },
    message: String,
    name: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
  })
);

module.exports = Kpatel;