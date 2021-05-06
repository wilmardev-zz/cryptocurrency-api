const values = (req, res) => {
  const status = {
    status: "OK",
  };
  return res.status(200).json(status);
};

module.exports = { values };
