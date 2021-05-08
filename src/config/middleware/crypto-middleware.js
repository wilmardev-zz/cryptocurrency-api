const ENV = process.env.NODE_ENV || "development";
const { config } = require("../environments/" + ENV);
const { Message } = require("../../entities/message-entity");

const validateInput = async (req, res, next) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ message: Message.dataNotProvided("id") });
  req.body.id = id.toLowerCase();
  next();
};

const validateQuery = async (req, res, next) => {
  const { filterDefaultOptions: filter } = config;
  let { order, top } = req.query;
  if (top && isNaN(top))
    return res.status(400).json({ message: Message.dataNotValid("top") });
  order = order || filter.order;
  order = order.toLowerCase();
  if (order !== "asc")
    if (order !== "desc")
      return res.status(400).json({ message: Message.dataNotValid("order") });
  top = parseInt(top || filter.topMax);
  if (top < 1 || top > filter.topMax)
    return res.status(400).json({ message: Message.dataNotValid("top") });
  req.query = { order, top };
  next();
};

module.exports = { validateInput, validateQuery };
