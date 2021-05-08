const axios = require("axios").default;

const get = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

module.exports = { get };
