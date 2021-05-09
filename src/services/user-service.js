const ENV = process.env.NODE_ENV || "development";
const { config } = require("../config/environments/" + ENV);
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user-repository");
const { User } = require("../entities/user-entity");
const { Unauthorize, Conflict } = require("../entities/errors-entities");
const { Message } = require("../entities/message-entity");

const create = async (data) => {
  const { userName, lastName, name, password, currency } = data;
  const userResponse = await userRepository.getByUserName(userName);
  if (userResponse) throw new Conflict(Message.userExist(userName));
  const user = new User(name, lastName, userName, password, currency);
  return await userRepository.create(user);
};

const login = async (data) => {
  const { jwtOptions } = config;
  const { userName, password } = data;
  const user = await userRepository.getByUserName(userName);
  if (!user || user.Password !== password)
    throw new Unauthorize(Message.loginInvalid());
  const token = jwt.sign(
    { currency: user.Currency, userName },
    jwtOptions.secret,
    {
      expiresIn: jwtOptions.expires,
    }
  );
  return { token };
};

module.exports = { create, login };
