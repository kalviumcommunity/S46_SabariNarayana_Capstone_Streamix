// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// GET /api/test
router.get('/test', testController.getTest);

module.exports = router;
