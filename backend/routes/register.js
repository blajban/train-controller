const express = require('express');

const router = express.Router();

const users = require('../auth/users');

router.post('/', (req, res, next) => users.register(req, res, next));

module.exports = router;
