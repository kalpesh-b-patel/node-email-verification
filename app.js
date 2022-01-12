require("dotenv").config();
require("./config/mongodb");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const health = require("./routes/health");
const cleancode = require("./routes/cleancode");
const kpatel = require("./routes/kpatel");

app.use(express.json());
app.use("/health", health);
app.use("/api/v1/cleancode", cleancode);
app.use("/api/v1/kpatel", kpatel);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
