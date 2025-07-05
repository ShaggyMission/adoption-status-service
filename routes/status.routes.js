const express = require('express');
const router = express.Router();
const { createStatus } = require('../controllers/status.controller');

router.post('/adoption/status', createStatus);

module.exports = router;
