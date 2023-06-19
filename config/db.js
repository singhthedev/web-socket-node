const mongoose = require("mongoose");
require('dotenv').config();


const dbUrl =
  `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWD}@wallet.jmjksgd.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected ...👍️"))
  .catch((error) => console.error("Database Connected ...😵", error));

module.exports = mongoose;