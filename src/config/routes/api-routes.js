const express = require("express");
const valuesController = require("../../controllers/values-controller");
const loginController = require("../../controllers/login-controller");
const userController = require("../../controllers/user-controller");

module.exports.routes = () => {
  const router = express.Router();
  router.get("/values", valuesController.values);
  router.post("/login", loginController.login);
  router.post("/user/create", userController.create);
  return router;
};
