const mongoose = require("mongoose");

class User {
  constructor(name, lastName, userName, password, currency) {
    this.Name = name;
    this.LastName = lastName;
    this.UserName = userName;
    this.Password = password;
    this.Currency = currency.toUpperCase();
    this.CreatedDate = Date.now();
  }
}

const UserDb = mongoose.model(
  "User",
  {
    Name: String,
    LastName: String,
    UserName: String,
    Password: String,
    Currency: String,
    CreatedDate: Date,
  },
  "User"
);

module.exports = { User, UserDb };
