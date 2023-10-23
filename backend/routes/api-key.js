const express = require('express');

const router = express.Router();

const apiKey = require('../auth/apiKey');
// eslint-disable-next-line
router.get('/', async (req, res, next) => {
  try {
    const key = await apiKey.generate();
    return res.json({
      description: 'API key generated',
      key
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
