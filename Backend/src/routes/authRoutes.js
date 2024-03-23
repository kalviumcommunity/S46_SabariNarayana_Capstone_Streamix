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

router.post('/signin', authController.postSignin)

router.post('/checkuser', authController.checkUser)

module.exports = router
