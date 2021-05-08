const { CryptocurrencyDb } = require("../entities/crypto-entity");

const create = async (cryptoEntitie) => {
  const cryptocurrency = CryptocurrencyDb(cryptoEntitie);
  return await cryptocurrency.save();
};

const getByCryptoAndUser = async (cryptoId, userName) => {
  return await CryptocurrencyDb.findOne(
    { Id: cryptoId, UserName: userName },
    null,
    {
      lean: true,
    }
  );
};

const getByUser = async (userName, field, order, top) => {
  return await CryptocurrencyDb.find({ UserName: userName }, null, {
    lean: true,
  })
    .sort({ [field]: order })
    .limit(top);
};

const getQuantityByUser = async (userName) => {
  return await CryptocurrencyDb.count({ UserName: userName });
};

module.exports = { create, getByCryptoAndUser, getByUser, getQuantityByUser };
