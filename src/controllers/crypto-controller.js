const cryptoService = require("../services/crypto-service");

const get = async (req, res, next) => {
  try {
    const response = await cryptoService.get();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { user } = req.headers;
    const { id } = req.body;
    const data = { id, ...user };
    await cryptoService.create(data);
    return res.status(201).json();
  } catch (error) {
    next(error);
  }
};

const getByUser = async (req, res, next) => {
  try {
    const {
      user: { userName, currency },
    } = req.headers;
    const { order, top } = req.query;
    const data = await cryptoService.getByUser(userName, currency, order, top);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { get, create, getByUser };
