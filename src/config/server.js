const express = require("express");
const ENV = process.env.NODE_ENV || "development";
const config = require("./environments/" + ENV).config;
const apiRoutes = require("./routes/api-routes");
const mongoDb = require("./database/mongodb");
const { errorHandler } = require("./middleware/error-handler-middleware");

const app = express();
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

const run = async () => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  await mongoDb.connect();
  app.use("/v1/crypto", apiRoutes.routes());
  app.use(errorHandler);
  app.listen(config.port, () =>
    console.log(`Cryptocurrency api running on port ${config.port}`)
  );
};

module.exports = { run };
