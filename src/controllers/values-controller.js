const { Message } = require("../entities/message-entity");
const cryptoService = require("../services/crypto-service");

const values = async (req, res) => {
  const status = {
    cryptocurrencyApi: "Ready for the party!",
    coingeckoApi: "",
  };
  try {
    const { gecko_says } = await cryptoService.health();
    status.coingeckoApi = gecko_says;
  } catch (error) {
    status.coingeckoApi = Message.generalError();
  } finally {
    res.status(200).json(status);
  }
};

module.exports = { values };
