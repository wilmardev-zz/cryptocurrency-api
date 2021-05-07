const mongoose = require("mongoose");

const connect = async () => {
  try {
    const { config } = global;
    await mongoose.connect(config.connectionString, config.dbOptions);
    console.info("Success connect to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connect };
