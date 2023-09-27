const apiKey = require('../auth/apiKey');

const verifyApiKey = async (req, res, next) => {
  try {
    const key = req.get('x-api-key');
    if (await apiKey.isValid(key)) {
      next();
    } else {
      const error = new Error('Unauthorised');
      error.status = 401;
      error.message = 'API key did not match';
      next(error);
    }
  } catch (err) {
    const error = new Error('No api key');
    error.status = 500;
    error.message = 'APÌ key missing';
    next(error);
  }
};

module.exports = verifyApiKey;
