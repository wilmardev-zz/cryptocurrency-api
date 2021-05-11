const { UserDb } = require("../entities/user-entity");

const create = async (user) => {
  const dbUser = UserDb(user);
  return dbUser.save();
};

const getByUserName = async (userName) => {
  return UserDb.findOne({ UserName: userName }, null, { lean: true });
};

module.exports = { create, getByUserName };
