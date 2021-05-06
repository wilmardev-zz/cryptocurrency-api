const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "development";
const config = require("../environments/" + ENV).config;

module.exports.connect = async () => {
  try {
    await mongoose.connect(config.connectionString, config.dbOptions);
    console.info("Success connect to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
