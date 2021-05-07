const mongoose = require("mongoose");

class Cryptocurrency {
  constructor(id, userName, cryptoInfo, cryptoPrices) {
    this.UserName = userName;
    this.Id = id;
    this.Name = cryptoInfo.name;
    this.Symbol = cryptoInfo.symbol;
    this.ArsPrice = cryptoPrices.arsPrice;
    this.UsdPrice = cryptoPrices.usdPrice;
    this.EurPrice = cryptoPrices.eurPrice;
    this.Image = cryptoInfo.image;
    this.LastUpdate = cryptoInfo.lasUpdate;
    this.CreatedDate = Date.now();
  }
}

const CryptocurrencyDb = mongoose.model("Cryptocurrency", {
  Id: String,
  UserName: String,
  Symbol: String,
  Value: Number,
  Name: String,
  Image: String,
  LastUpdate: Date,
  CreatedDate: Date,
});

module.exports = { Cryptocurrency, CryptocurrencyDb };
