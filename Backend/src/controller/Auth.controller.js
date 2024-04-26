// routes/testRoutes.js
// Importing the express module
const express = require('express');

// Creating a Auth instance
const Auth = express.Router();

const authService = require('@controller/Auth.service.js');

Auth.get('/', async (req, res) => {
  res.json({ connectionStatus: 'API/Auth connected' });
});

// GET /api/test
Auth.get('/test', authService.getTest);

Auth.post('/signup', authService.postSignup);

Auth.post('/signin', authService.postSignin);

Auth.post('/checkuser', authService.checkUser);

module.exports = Auth;
