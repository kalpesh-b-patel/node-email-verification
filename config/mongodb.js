require('dotenv').config();
const mongoose = require('mongoose');
const usr = process.env.MONGO_USER;
const pwd = process.env.MONGO_PWD;

const uri = `mongodb+srv://${usr}:${pwd}@node-email-verification.qulap.mongodb.net/subscription?retryWrites=true&w=majority`;

try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.log('Error!');
}
