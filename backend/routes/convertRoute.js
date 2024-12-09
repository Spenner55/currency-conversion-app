const express = require('express');
const router = express.Router();
const convertController = require('../controllers/convertController');

router.route('/convert')
  .get(convertController.convertCurrency);

module.exports = router;