const ENV = process.env.NODE_ENV || "development";
const { config } = require("../environments/" + ENV);
const { Message } = require("../../entities/message-entity");
const jwt = require("jsonwebtoken");

const validateInput = async (req, res, next) => {
  const { password, currency } = req.body;
  const regex = new RegExp(/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}/);
  if (!password || !regex.test(password))
    return res.status(400).json({ message: Message.passwordNotValid() });
  if (
    !currency ||
    !config.currencyOptions.filter(
      (op) => op.toLowerCase() === currency.toLowerCase()
    ).length > 0
  )
    return res.status(400).json({ message: Message.dataNotValid("currency") });
  next();
};

const validateJwt = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: Message.unauthorized() });
  jwt.verify(token, config.jwtOptions.secret, (error, decodedJwt) => {
    if (error)
      if (error.name === "TokenExpiredError")
        return res.status(403).json({ message: Message.tokenNotValid() });
      else return res.status(401).json({ message: Message.unauthorized() });
    req.headers.user = decodedJwt;
    next();
  });
};

module.exports = { validateInput, validateJwt };
