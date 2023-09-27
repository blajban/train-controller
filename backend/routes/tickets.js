const express = require('express');

const router = express.Router();

const checkToken = require('../middleware/checkToken');

const tickets = require('../models/tickets');

router.get('/',
  (req, res, next) => checkToken(req, res, next),
  (req, res, next) => tickets.getTickets(req, res, next));

router.post('/',
  (req, res, next) => checkToken(req, res, next),
  (req, res, next) => tickets.createTicket(req, res, next));

module.exports = router;
