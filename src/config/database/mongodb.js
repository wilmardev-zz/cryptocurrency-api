const ENV = process.env.NODE_ENV || "development";
const { config } = require("../environments/" + ENV);
const userService = require("../../services/user-service");
const userPopulate = require("./populatedb");
const mongoose = require("mongoose");

const connect = async () => {
  try {
    const url = process.env.MONGO_URI || config.connectionString;
    await mongoose.connect(url, config.dbOptions);
    console.info("Success connect to MongoDB");
    console.info("Populating database with users...");
    userPopulate.forEach((user) => userService.create(user));
    console.info("Finish to populate database.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connect };
