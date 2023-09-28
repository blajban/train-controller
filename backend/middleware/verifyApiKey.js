const apiKey = require('../auth/apiKey');
const { NoApiKeyError, WrongApiKeyError } = require('../errors');


const verifyApiKey = async (req, res, next) => {
  try {
    const key = req.get('x-api-key');
    if (await apiKey.isValid(key)) {
      next();
    } else {
      next(new WrongApiKeyError());
    }
  } catch (err) {
    next(new NoApiKeyError());
  }
};

module.exports = verifyApiKey;
