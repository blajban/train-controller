const jwt = require('jsonwebtoken');

const { NoTokenError, InvalidTokenError } = require('../errors');


const checkToken = (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      return next();
    }
    const token = req.headers['x-access-token'];
    if (!token) {
      return next(new NoTokenError());
    }

    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret);
    return next();
  } catch (error) {
    next(new InvalidTokenError());
  }
}

module.exports = checkToken;