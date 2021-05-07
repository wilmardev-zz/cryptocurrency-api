module.exports.errorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.statusCode
    ? "Somenthin went wrong. Please try again"
    : error.message;
  return res.status(status).json({ message });
};
