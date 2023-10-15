const jwt = require('jsonwebtoken');

const { NoTokenError, InvalidTokenError } = require('../errors');


const checkTokenHttp = (req, res, next) => {
  try {
    checkToken(req);
    return next();
  } catch (error) {
    next(error);
  }
}

const checkToken = (req) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    throw new NoTokenError();
  }

  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new InvalidTokenError();
  }
}



const checkTokenGraphQL = (req) => {
  try {
    return checkToken(req);
  } catch (error) {
    return null;
  }
}

module.exports = { checkTokenHttp, checkToken, checkTokenGraphQL };