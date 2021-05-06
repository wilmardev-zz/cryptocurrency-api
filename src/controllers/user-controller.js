const userService = require("../services/user-service");

const create = async (req, res) => {
  const data = req.body;
  const response = await userService.create(data);
  return res.status(200).json(response);
};

module.exports = { create };
