const ENV = process.env.NODE_ENV || "development";
const { config } = require("../config/environments/" + ENV);
const {
  Cryptocurrency,
  CryptocurrencyDto,
} = require("../entities/crypto-entity");
const { Message } = require("../entities/message-entity");
const { BadRequest, Conflict } = require("../entities/errors-entities");
const cryptoAdapter = require("../adapters/crypto-adapter");
const cryptoRepository = require("../repositories/crypto-repository");

const health = async () => {
  return await cryptoAdapter.health();
};

/**
 * Get all cryptocurrency data (7000+)
 * @param {String} currency currency of the user [ARS, USD, EUR]
 * @param {Boolean} allData flag for get all adicional info for the cryptocurrency. Default `false`
 * @returns
 */
const get = async (currency, allData = true) => {
  const cryptoList = await cryptoAdapter.getAll();
  if (!allData) return await getInfoAdicionalList(cryptoList, currency);
  return cryptoList;
};

/**
 * Get info adicional foreach crypto. Warning to use: The server api has limit for 60 request per minute!
 * @param {Array} cryptoList List of all cryptocurrencies (7000+)
 * @param {String} currency currency of the user [ARS, USD, EUR]
 * @returns
 */
const getInfoAdicionalList = async (cryptoList, currency) => {
  const response = [];
  cryptoList = cryptoList.slice(0, 10);
  for await (const item of cryptoList) {
    const cryptoInfo = (
      await cryptoAdapter.getAditionalInfo(item.id, currency)
    )[0];
    const crypto = new Cryptocurrency(item.id, cryptoInfo);
    response.push(crypto);
  }
  return response;
};

const create = async (data) => {
  const currencies = config.currencyOptions.join();
  const { id, userName, currency } = data;
  const cryptoPrice = await cryptoAdapter.getPrice(id, currencies);
  if (Object.keys(cryptoPrice).length === 0)
    throw new BadRequest(Message.notFound(id));
  const existCrypto = await cryptoRepository.getByCryptoAndUser(id, userName);
  if (existCrypto) throw new Conflict(Message.alreadyExistCrypto(id));
  const cryptoInfo = (await cryptoAdapter.getAditionalInfo(id, currency))[0];
  const crypto = new Cryptocurrency(id, cryptoInfo, userName, cryptoPrice[id]);
  return await cryptoRepository.create(crypto);
};

const getByUser = async (userName, currency, order, top) => {
  const response = [];
  currency = currency.toLowerCase();
  let field = currency.charAt(0).toUpperCase() + currency.slice(1);
  field = `${field}Price`;
  const data = await cryptoRepository.getByUser(userName, field, order, top);
  data.forEach((crypto) => response.push(new CryptocurrencyDto(crypto)));
  return response;
};

module.exports = { health, get, create, getByUser };
