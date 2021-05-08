const ENV = process.env.NODE_ENV || "development";
const { config } = require("../config/environments/" + ENV);
const baseAdapter = require("./base-adapter");

const getPrice = async (cryptoId, currencies) => {
  const endpoint = config.coingeckoApi.price;
  const path = endpoint.replace("{1}", cryptoId).replace("{2}", currencies);
  const url = `${config.coingeckoApi.baseUrl}${path}`;
  return await baseAdapter.get(url);
};

const getAditionalInfo = async (cryptoId, currency) => {
  const endpoint = config.coingeckoApi.makets;
  const path = endpoint.replace("{1}", currency).replace("{2}", cryptoId);
  const url = `${config.coingeckoApi.baseUrl}${path}`;
  return await baseAdapter.get(url);
};

module.exports = { getPrice, getAditionalInfo };
