require('dotenv').config();
const mongoose = require('mongoose');

const usr = process.env.MONGO_USER;
const pwd = process.env.MONGO_PWD;
const cluster = process.env.MONGO_CLUSTER;
const db = process.env.MONGO_DB;

const uri = `mongodb+srv://${usr}:${pwd}@${cluster}.vmw78.mongodb.net/${db}?retryWrites=true&w=majority`;

try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.log('Error!');
}
