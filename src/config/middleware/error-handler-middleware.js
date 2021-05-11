const { Message } = require("../../entities/message-entity");

module.exports.errorHandler = (error, req, res, next) => {
  console.log("ERROR ::: ", error);
  const status = error.statusCode || 500;
  const message = status === 500 ? Message.generalError() : error.message;
  return res.status(status).json({ message });
};
