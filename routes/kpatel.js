const route = require("express").Router();
const sendEmail = require("../config/mailer");
const Kpatel = require("../models/kpatel.model");

route.post("/", async (req, res) => {
  const { email, name, message } = req.body;
  await sendEmail(email);

  const newMessage = new Kpatel({
    email,
    name,
    message,
  });
  await newMessage.save();

  res.status(200).json({
    email,
    name,
    message,
  });
});

module.exports = route;
