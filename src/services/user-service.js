const { User } = require("../entities/user-entity");
const userRepository = require("../repositories/user-repository");

const create = async (data) => {
  const { userName, lastName, name, password, currency } = data;
  const user = new User(name, lastName, userName, password, currency);
  const existUser = await userRepository.getByUserName(userName);
  if (existUser)
    return { message: `The UserName '${userName}' already exist.` };
  return await userRepository.create(user);
};

module.exports = { create };
