const userService = require("../services/user-service");

const login = async (req, res, next) => {
  try {
    const response = await userService.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
