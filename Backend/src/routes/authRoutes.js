// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET /api/test
router.get('/auth', authController.getTest);

module.exports = router;
