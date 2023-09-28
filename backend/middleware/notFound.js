const { NotFoundError } = require('../errors');

const notFound = (req, res, next) => {
  next(new NotFoundError(req.originalUrl));
};

module.exports = notFound;
