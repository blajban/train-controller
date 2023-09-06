const express = require('express');
const router = express.Router();

const delayed = require("../models/delayed.js");

router.get('/', (req, res, next) => delayed.getDelayedTrains(req, res, next));

module.exports = router;
