const express = require('express');

const router = express.Router();

const users = require('../auth/users');
const { checkTokenHttp } = require('../middleware/checkToken');

router.post('/',
    (req, res, next) => checkTokenHttp(req, res, next),
    (req, res, next) => users.verify(req, res, next));

module.exports = router;
