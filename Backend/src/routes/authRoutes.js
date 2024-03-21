// routes/testRoutes.js
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/', async (req, res) => {
    res.json({ connectionStatus: 'API/Auth connected' })
})

// GET /api/test
router.get('/test', authController.getTest)

router.post('/signup', authController.postSignup)

module.exports = router
