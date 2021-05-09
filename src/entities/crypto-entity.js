const mongoose = require("mongoose");

class Cryptocurrency {
  constructor(id, cryptoInfo, userName, cryptoPrices) {
    this.Id = id;
    this.Name = cryptoInfo.name;
    this.Symbol = cryptoInfo.symbol;
    this.Image = cryptoInfo.image;
    this.LastUpdate = cryptoInfo.last_updated;
    if (cryptoPrices) {
      this.UserName = userName;
      this.ArsPrice = cryptoPrices.ars;
      this.UsdPrice = cryptoPrices.usd;
      this.EurPrice = cryptoPrices.eur;
      this.CreatedDate = Date.now();
    } else this.Price = cryptoInfo.current_price;
  }
}

class CryptocurrencyDto {
  constructor(cryptocurrencyDb) {
    this.Name = cryptocurrencyDb.Name;
    this.Image = cryptocurrencyDb.Image;
    this.Symbol = cryptocurrencyDb.Symbol;
    this.ArsPrice = cryptocurrencyDb.ArsPrice;
    this.UsdPrice = cryptocurrencyDb.UsdPrice;
    this.EurPrice = cryptocurrencyDb.EurPrice;
    this.LastUpdate = cryptocurrencyDb.LastUpdate;
  }
}

const CryptocurrencyDb = mongoose.model(
  "Cryptocurrency",
  {
    Id: String,
    UserName: String,
    Name: String,
    Symbol: String,
    ArsPrice: Number,
    UsdPrice: Number,
    EurPrice: Number,
    Image: String,
    LastUpdate: Date,
    CreatedDate: Date,
  },
  "Cryptocurrency"
);

module.exports = {
  Cryptocurrency,
  CryptocurrencyDto,
  CryptocurrencyDb,
};
