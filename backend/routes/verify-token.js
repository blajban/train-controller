const express = require('express');

const router = express.Router();

const users = require('../auth/users');
const checkToken = require('../middleware/checkToken');

router.post('/',
    (req, res, next) => checkToken(req, res, next),
    (req, res, next) => users.verify(req, res, next));

module.exports = router;
