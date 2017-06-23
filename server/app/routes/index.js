const express = require('express');
const router = module.exports = express.Router();

router.use('/images', require('./image'));
router.use('/auth', require('./auth'));
