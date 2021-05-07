const userService = require("../services/user-service");

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await userService.create(data);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
