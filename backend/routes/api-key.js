const express = require('express');

const router = express.Router();

const { apiKeyModel } = require('../models/auth');

router.get('/', async (req, res, next) => {
  try {
    res.json({
      description: 'API key generated',
      key: await apiKeyModel.generate()
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


