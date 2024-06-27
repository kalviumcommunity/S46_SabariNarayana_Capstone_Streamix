const emailChecker = require('@utils/EmailChecker');
const passwordChecker = require('@utils/PasswordChecker');
const { assignToken } = require('@utils/tokenAssigning');
const { TokenGenerator } = require('@utils/generateJWT');
const { accessTokenChecker, refreshTokenChecker } = require('@utils/TokenCheking');
const config = require('@config/config.js'); // Assuming you have a centralized config file
const mdResolver = require('@mongodb/resolver');
// Google auth import
const { OAuth2Client } = require('google-auth-library');
const { response } = require('express');
const google = require('googleapis').google;

exports.getTest = (req, res) => {
  try {
    // You can add any logic or data processing here
    const testData = {
      message: 'Hello, World!',
      timestamp: new Date().toISOString()
    };

    // Send the test data as a JSON response
    res.status(200).json(testData);
  } catch (err) {
    // Handle errors using a centralized error handler
    errorHandler(err, res);
  }
};

exports.postSignup = async (req, res) => {
  console.log('signup');
  try {
    // Destructuring required data from request body
    const { name, password, email } = req.body;
    const { validateEmail } = emailChecker;
    const userExists = await validateEmail(email);
    if (userExists.UserExist) {
      return res.status(200).json({ emailExists: true });
    }
    const userData = {
      name,
      password,
      email,
      provider: 'email'
    };
    // Database Function for setting user
    await mdResolver.postUser(userData);

    res.status(201).json({
      emailExists: false,
      message: 'User created successfully'
    });
  } catch (err) {
    // Handle errors using a centralized error handler
    errorHandler(err, res);
  }
};

exports.postSignin = async (req, res) => {
  try {
    // Destructuring required data from request body
    const { password, email } = req.body;
    const { validateEmail } = emailChecker;
    // fetching data from DB
    const userExists = await validateEmail(email);
    if (userExists.provider === 'google') {
      return res.status(200).json({
        error: false,
        emailExists: true,
        google: true,
        message: 'Login with Google'
      });
    }
    // Email Validation
    if (!userExists.UserExist) {
      return res.status(200).json({
        error: false,
        emailExists: false,
        google: false,
        message: 'User does not exist'
      });
    }
    const { passwordChecker: pwdChecker } = passwordChecker;
    // Password Validation
    if (!(await pwdChecker(password, userExists.password))) {
      return res.status(200).json({
        emailExists: true,
        google: false,
        message: 'Password incorrect'
      });
    }
    // Token assignment
    const { accessToken, refreshToken } = await assignToken(userExists.id);

    // Set access token as cookie
    res.cookie('access_token', accessToken, { httpOnly: true });

    // Set refresh token as cookie
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    res.status(200).json({
      emailExists: true,
      accessToken,
      refreshToken
    });
  } catch (err) {
    // Handle errors using a centralized error handler
    errorHandler(err, res);
  }
};

exports.checkUser = async (req, res) => {
  try {
    // Retrieve cookies from the request
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    console.log(accessToken, refreshToken);
    // Check the validity of the access token
    const isAccessTokenValid = await accessTokenChecker(accessToken);
    console.log(isAccessTokenValid);
    // If the access token is valid, respond to the client
    if (isAccessTokenValid.valid) {
      return res.status(200).json({ success: true, accessToken, refreshToken });
    }

    // If the access token is not valid, check the refresh token
    const refreshData = await refreshTokenChecker(refreshToken);
    console.log('---', refreshData);
    // If the refresh token is valid, generate new access and refresh tokens
    if (refreshData.valid) {
      // Generate new tokens
      const newAccessToken = TokenGenerator(refreshData.id, '15m');
      const newRefreshToken = TokenGenerator(refreshData.id, '7d');
      // Token assignmen

      await mdResolver.updateRefreshToken(refreshData.id, refreshToken, newRefreshToken);

      // Set the new access and refresh tokens as cookies
      res.cookie('access_token', newAccessToken, { httpOnly: true });
      res.cookie('refresh_token', newRefreshToken, { httpOnly: true });

      // Respond to the client with new tokens
      return res.status(200).json({
        success: true
      });
    }

    // If both access and refresh tokens are invalid, respond with an error
    return res.status(401).json({ error: 'Unauthorized' });
  } catch (error) {
    // Handle errors using a centralized error handler
    errorHandler(error, res);
  }
};

exports.postLogout = async (req, res) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;
  // Check the validity of the access token
  const isAccessTokenValid = await accessTokenChecker(accessToken);
  console.log(isAccessTokenValid);
  // If the access token is valid, respond to the client
  if (isAccessTokenValid.valid) {
    const response = await mdResolver.deleteRefreshToken(isAccessTokenValid.id, refreshToken);
  }
  if (response) {
    res.cookie('access_token', null, { httpOnly: true });
    res.cookie('refresh_token', null, { httpOnly: true });
    res.status(200).json({ message: 'loged out successfully' });
  } else {
    res.status(200).json({ message: 'not loged out successfully' });
  }
};
// Google Auth

exports.googleCallback = async (req, res) => {
  const REDIRECT_URI = config.REDIRECT_URI;
  const client = new OAuth2Client(config.CLIENT_ID, config.CLIENT_SECRET, REDIRECT_URI);
  const { code } = req.query;

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get user information from Google
    const oauth2 = google.oauth2({ version: 'v2', auth: client });
    const userInfo = await oauth2.userinfo.get();

    const { validateEmail } = emailChecker;
    const userExists = await validateEmail(userInfo.data.email);

    if (!userExists.UserExist) {
      const newUser = {
        name: userInfo.data.name,
        email: userInfo.data.email,
        provider: 'google'
      };
      // Database Function for setting user
      const data = await mdResolver.postUser(newUser);
      userExists.id = data._id.toString();
    }

    const { accessToken, refreshToken } = await assignToken(userExists.id);

    // Set access token as cookie
    res.cookie('access_token', accessToken, { httpOnly: true });

    // Set refresh token as cookie
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    // Redirect the user to the desired page after successful authentication
    res.redirect(303, `${config.FRONTEND_URL}/`);
  } catch (err) {
    // Handle errors using a centralized error handler
    errorHandler(err, res, 'Error authenticating with Google');
    res.redirect(303, `${config.FRONTEND_URL}/`);
  }
};

exports.googleAuth = async (req, res) => {
  const REDIRECT_URI = config.REDIRECT_URI;
  const client = new OAuth2Client(config.CLIENT_ID, config.CLIENT_SECRET, REDIRECT_URI);
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile email'],
    prompt: 'consent'
  });

  res.json({ authURL: authUrl });
};
const logger = {
  error: (err) => {
    console.error(err);
  }
};

// Centralized error handler function
const errorHandler = (err, res, customMessage) => {
  // Log the error
  logger.error(err);

  // Prepare the error response
  const errorResponse = {
    error: err.message || 'Internal Server Error'
  };

  // If a custom message is provided, include it in the response
  if (customMessage) {
    errorResponse.message = customMessage;
  }

  // Send the error response
  res.status(500).json(errorResponse);
};
