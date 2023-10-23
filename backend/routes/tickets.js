const express = require('express');

const router = express.Router();

const { checkTokenHttp } = require('../middleware/checkToken');

const tickets = require('../models/tickets');

router.get(
  '/',
  (req, res, next) => checkTokenHttp(req, res, next),
  (req, res, next) => tickets.getTickets(req, res, next)
);

router.post(
  '/',
  (req, res, next) => checkTokenHttp(req, res, next),
  (req, res, next) => tickets.createTicket(req, res, next)
);

module.exports = router;
