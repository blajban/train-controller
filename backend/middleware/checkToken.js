const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      const error = new Error('No token');
      error.status = 403;
      error.message = 'No token provided';
      return next(error);
    }

    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret);
    return next();
  } catch (error) {
    error.status = 401;
    error.message = 'Invalid token';
    next(error);
  }
}

module.exports = checkToken;