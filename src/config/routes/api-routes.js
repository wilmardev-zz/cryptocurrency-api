const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../../swagger.json");
const valuesController = require("../../controllers/values-controller");
const loginController = require("../../controllers/login-controller");
const userController = require("../../controllers/user-controller");
const userMiddleware = require("../middleware/user-middleware");

module.exports.routes = () => {
  const router = express.Router();
  router.use("/doc", swaggerUi.serve);
  router.get("/doc", swaggerUi.setup(swaggerDocument));
  router.get("/values", valuesController.values);
  router.post("/login", loginController.login);
  router.post(
    "/user/create",
    userMiddleware.validateInput,
    userController.create
  );
  return router;
};
