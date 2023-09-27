const express = require('express');

const router = express.Router();

const apiKey = require('../auth/apiKey');

router.get('/', async (req, res, next) => {
  try {
    res.json({
      description: 'API key generated',
      key: await apiKey.generate()
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


