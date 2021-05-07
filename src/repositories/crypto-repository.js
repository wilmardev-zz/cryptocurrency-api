const { CryptocurrencyDb } = require("../entities/crypto-entity");

const create = async (cryptocurrency) => {
  const cryptocurrency = CryptocurrencyDb(user);
  return await cryptocurrency.save();
};

const getByUser = async (cryptoId, userName, order) => {
  return await CryptocurrencyDb.findOne(
    { CryptocurrencyId: cryptoId, UserName: userName },
    null,
    {
      lean: true,
    }
  ).sort(order);
};

const getQuantityByUser = async (userName) => {
  return await CryptocurrencyDb.count({ UserName: userName });
};

module.exports = { create, getByUser, getQuantityByUser };
