const apiKey = require('../auth/apiKey');
const { NoApiKeyError, WrongApiKeyError } = require('../errors');


const verifyApiKey = async (req, res, next) => {
  try {
    const key = req.get('x-api-key');
    if (!key) {
      return next(new NoApiKeyError());
    }

    if (await apiKey.isValid(key)) {
      return next();
    }

    return next(new WrongApiKeyError());
    
  } catch (err) {
    next(err);
  }
};

module.exports = verifyApiKey;
