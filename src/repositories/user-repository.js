const { UserDb } = require("../entities/user-entity");

const create = async (user) => {
  const dbUser = UserDb(user);
  return await dbUser.save();
};

const getByUserName = async (userName) => {
  const existUser = await UserDb.find({ UserName: userName });
  return existUser.length > 0;
};

module.exports = { create, getByUserName };
