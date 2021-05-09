const userService = require("../services/user-service");

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await userService.create(data);
    return res.status(201).json();
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
