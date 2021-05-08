const ENV = process.env.NODE_ENV || "development";
const { config } = require("../config/environments/" + ENV);
const {
  Cryptocurrency,
  CryptocurrencyDto,
} = require("../entities/crypto-entity");
const { Message } = require("../entities/message-entity");
const { BadRequest } = require("../entities/errors-entities");
const cryptoAdapter = require("../adapters/crypto-adapter");
const cryptoRepository = require("../repositories/crypto-repository");

const create = async (data) => {
  const currencies = config.currencyOptions.join();
  const { id, userName, currency } = data;
  const cryptoPrice = await cryptoAdapter.getPrice(id, currencies);
  if (Object.keys(cryptoPrice).length === 0)
    throw new BadRequest(Message.notFound(id));
  const existCrypto = await cryptoRepository.getByCryptoAndUser(id, userName);
  if (existCrypto) throw new BadRequest(Message.alreadyExistCrypto(id));
  const cryptoInfo = (await cryptoAdapter.getAditionalInfo(id, currency))[0];
  const crypto = new Cryptocurrency(id, userName, cryptoInfo, cryptoPrice[id]);
  return await cryptoRepository.create(crypto);
};

const get = async (userName, currency, order, top) => {
  const response = [];
  currency = currency.toLowerCase();
  let field = currency.charAt(0).toUpperCase() + currency.slice(1);
  field = `${field}Price`;
  const data = await cryptoRepository.getByUser(userName, field, order, top);
  data.forEach((crypto) => response.push(new CryptocurrencyDto(crypto)));
  return response;
};

module.exports = { create, get };
