// Load the module dependencies:
//  config.js module and mongoose module
var config = require("./config"),
  mongoose = require("mongoose");
// Define the Mongoose configuration method
module.exports = function () {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect(config.db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log("Error");
    });
  require("../app/models/user.server.model");
  require("../app/models/vital-sign.server.model");
  require("../app/models/emergency.server.model");
  require("../app/models/daily-tip.server.model");
  return db;
};
