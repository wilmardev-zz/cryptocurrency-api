const { CryptocurrencyDb } = require("../entities/crypto-entity");

const create = async (cryptoEntitie) => {
  const cryptocurrency = CryptocurrencyDb(cryptoEntitie);
  return cryptocurrency.save();
};

const getByCryptoAndUser = async (cryptoId, userName) => {
  return CryptocurrencyDb.findOne({ Id: cryptoId, UserName: userName }, null, {
    lean: true,
  });
};

const getByUser = async (userName, field, order, top) => {
  return CryptocurrencyDb.find({ UserName: userName }, null, {
    lean: true,
  })
    .sort({ [field]: order })
    .limit(top);
};

module.exports = { create, getByCryptoAndUser, getByUser };
