const route = require("express").Router();

const sendEmail = require("../config/mailer");
const randomString = require("../utils/randomString");
const status = require("../utils/constants");
const Cleancode = require("../models/cleancode.model");

route.post("/verify", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Invalid email address!",
    });
  }

  // Duplicate subscription
  try {
    const found = await Cleancode.findOne({ email });

    if (found) {
      if (found.status === status.active) {
        return res.status(400).json({
          message: "You are already subscribed!",
        });
      } else {
        const today = new Date().toISOString();
        const expires = new Date(found.expiresAt).toISOString();

        if (today > expires) {
          // TODO: Send new link with updated expiry date
          return res.status(400).json({
            message:
              "This link has been expired! New link has been sent to you!",
          });
        } else {
          return res.status(200).json({
            message:
              "Link has already been sent to you! Please check your email!",
          });
        }
      }
    }
  } catch {
    return res.status(500).json({
      message: "Oops! Something went wrong! Please try again later",
    });
  }

  // New subscription
  try {
    const token = randomString(32);
    let expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    const sent = await sendEmail(email, token);

    if (!sent) {
      return res.status(400).json({
        message:
          "We could not send the verification link to your email address!",
      });
    }

    const newSubscriber = new Cleancode({
      email,
      token,
      expiresAt: expiresAt.toISOString(),
    });
    await newSubscriber.save();

    res.status(200).json({
      message: "Email sent!",
    });
  } catch (e) {
    res.status(500).json({
      message: "Oops! Something went wrong! Please try again later",
    });
  }
});

route.get("/confirm", async (req, res) => {
  const { email, token } = req.query;

  if (!email || !token) {
    return res.status(400).json({
      message: "Bad Request!",
    });
  }

  const found = await Email.findOne({ email });

  if (!found) {
    return res.status(400).json({
      message: "Bad request!",
    });
  }

  if (found.status === "Active") {
    return res.status(400).json({
      message: "Email has already been verified!",
    });
  }

  await Email.findOneAndReplace(
    { email },
    { email, status: "Active", expiresAt: undefined }
  );
  res.status(200).json({
    message: "Succesfully verified!",
  });
});

module.exports = route;
