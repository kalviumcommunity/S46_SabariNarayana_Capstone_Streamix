// Importing the express module
const express = require('express')

// Creating a router instance
const router = express.Router()

const Auth = require('./authRoutes')

router.use('/auth', Auth)

router.get('/', async (req, res) => {
    res.json({ connectionStatus: 'API connected' })
})

// Exporting the router for use in other modules
module.exports = router
