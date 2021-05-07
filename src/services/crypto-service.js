const { Cryptocurrency } = require("../entities/crypto-entity");
const cryptoAdapter = require("../adapters/crypto-adapter");
const cryptoRepository = require("../repositories/crypto-repository");

const create = async (data) => {
  const { config } = global;
  const { id, userName, currency } = data;
  const existCrypto = await cryptoRepository.getByUser(id, userName);
  if (existCrypto)
    throw new Error(`cryptocurrency '${id}' is already asociate.`);
  const cryptoInfo = await cryptoAdapter.getAditionalInfo(id, currency);
  const cryptoPrice = await cryptoAdapter.getPrice(id, config.currencyOptions);
  const crypto = new Cryptocurrency(id, userName, cryptoInfo, cryptoPrice);
  return await cryptoRepository.create(crypto);
};

module.exports = { create, login };
