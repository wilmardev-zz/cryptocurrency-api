const { UserDb } = require("../entities/user-entity");

const create = async (user) => {
  const dbUser = UserDb(user);
  return await dbUser.save();
};

const getByUserName = async (userName) => {
  return await UserDb.findOne({ UserName: userName }, null, { lean: true });
};

module.exports = { create, getByUserName };
