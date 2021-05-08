const cryptoService = require("../services/crypto-service");

const create = async (req, res, next) => {
  try {
    const { user } = req.headers;
    const { id } = req.body;
    const data = { id, ...user };
    const response = await cryptoService.create(data);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const {
      user: { userName, currency },
    } = req.headers;
    const { order, top } = req.query;
    const response = await cryptoService.get(userName, currency, order, top);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, get };
