module.exports.config = {
  port: 5005,
  connectionString:
    "mongodb+srv://wsduque:2hT6dDU8fUNdAC0I@clustertest.6s8tr.mongodb.net/cryptodb?retryWrites=true&w=majority",
  dbOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  currencyOptions: ["EUR", "USD", "ARS"],
  filterDefaultOptions: {
    topMax: 25,
    order: "desc",
  },
  jwtOptions: {
    secret: "2F21F277F732204CBEECF2746F8B3EE11479135A835059B4125FDDD098611911",
    expires: 60, // seconds
  },
  coingeckoApi: {
    baseUrl: "https://api.coingecko.com/api/v3/",
    price: "simple/price?ids={1}&vs_currencies={2}",
    makets: "coins/markets?vs_currency={1}&ids={2}&sparkline=false",
    list: "coins/list?include_platform=false",
    health: "ping",
  },
};
