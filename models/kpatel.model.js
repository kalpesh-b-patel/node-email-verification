const mongoose = require("mongoose");
const status = require("../utils/constants");

const Kpatel = mongoose.model(
  "Kpatel",
  new mongoose.Schema({
    email: String,
    message: String,
    name: String,
    createdAt: {
      type: Date,
      default: new Date().toISOString(),
    },
  })
);

module.exports = Kpatel;
