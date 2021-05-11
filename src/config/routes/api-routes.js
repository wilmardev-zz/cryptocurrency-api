const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../../swagger.json");
const valuesController = require("../../controllers/values-controller");
const loginController = require("../../controllers/login-controller");
const userController = require("../../controllers/user-controller");
const cryptoController = require("../../controllers/crypto-controller");
const userMiddleware = require("../middleware/user-middleware");
const cryptoMiddleware = require("../middleware/crypto-middleware");

const routes = () => {
  const router = express.Router();
  router.use("/doc", swaggerUi.serve);
  router.get("/doc", swaggerUi.setup(swaggerDocument));
  router.get("/values", valuesController.values);
  router.post("/user/login", loginController.login);
  router.post(
    "/user/create",
    userMiddleware.validateInput,
    userController.create
  );

  return router;
};

const authRoutes = () => {
  const router = express.Router();
  router.get("/list", cryptoController.get);
  router.post(
    "/create",
    cryptoMiddleware.validateInput,
    cryptoController.create
  );
  router.get(
    "/user/list",
    cryptoMiddleware.validateQuery,
    cryptoController.getByUser
  );
  return router;
};

module.exports = { routes, authRoutes };
