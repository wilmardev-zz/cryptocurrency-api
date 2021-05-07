const jwt = require("jsonwebtoken");
const { User } = require("../entities/user-entity");
const userRepository = require("../repositories/user-repository");
const { Unauthorize } = require("../entities/errors-entities");

const create = async (data) => {
  const { userName, lastName, name, password, currency } = data;
  const userResponse = await userRepository.getByUserName(userName);
  if (userResponse) return { message: `UserName '${userName}' already exist.` };
  const user = new User(name, lastName, userName, password, currency);
  return await userRepository.create(user);
};

const login = async (data) => {
  const {
    config: { jwtOptions },
  } = global;
  const { userName, password } = data;
  const user = await userRepository.getByUserName(userName);
  if (!user || user.Password !== password)
    throw new Unauthorize(`invalid username or password.`);
  const token = jwt.sign(
    { currency: user.currency, ...data },
    jwtOptions.secret,
    {
      expiresIn: jwtOptions.expires,
    }
  );
  return { token };
};

module.exports = { create, login };
