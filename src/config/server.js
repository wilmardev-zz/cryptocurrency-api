const express = require("express");
const cors = require("cors");
const ENV = process.env.NODE_ENV || "development";
const config = require("./environments/" + ENV).config;
const apiRoutes = require("./routes/api-routes");
const mongoDb = require("./database/mongodb");
const { validateJwt } = require("./middleware/user-middleware");
const { errorHandler } = require("./middleware/error-handler-middleware");

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

const run = async () => {
  mongoDb.connect();
  app.use("/api/v1", apiRoutes.routes());
  app.use("/api/v1/crypto", validateJwt, apiRoutes.authRoutes());
  app.use(errorHandler);
  app.listen(config.port, () =>
    console.log(`Cryptocurrency api running on port ${config.port}`)
  );
};

module.exports = { run };
