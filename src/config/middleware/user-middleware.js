const validateInput = async (req, res, next) => {
  const { config } = global;
  const { password, currency } = req.body;
  const regex = new RegExp(/[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}/);
  if (!password || !regex.test(password))
    return res.status(400).json({
      message: `the 'password' field must be longer than 8 characters`,
    });
  if (
    !currency ||
    !config.currencyOptions.filter(
      (op) => op.toLowerCase() === currency.toLowerCase()
    ).length > 0
  )
    return res.status(400).json({
      message: `the 'currency' field doesn't contain a valid option.`,
    });
  next();
};

module.exports = { validateInput };
