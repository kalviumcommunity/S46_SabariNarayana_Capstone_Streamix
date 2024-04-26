const jwt = require('jsonwebtoken');
const config = require('@config/config.js'); // Assuming you have a centralized config file

const accessTokenChecker = async (accessToken) => {
  try {
    const data = await jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
    if (data) {
      return { valid: true, id: data.data };
    }
  } catch (error) {
    console.log(error);
    console.error('No Access Token');
  }
  return false; // Access token is invalid or verification failed
};

const refreshTokenChecker = async (refreshToken) => {
  console.log('refreshToken:', refreshToken);
  try {
    const data = await jwt.verify(refreshToken, config.ACCESS_TOKEN_SECRET);
    console.log(data);
    if (data) {
      return { valid: true, id: data.data };
    } // Refresh token is valid
  } catch (error) {
    console.error('Error verifying refresh token:', error);
  }
  return false; // Refresh token is invalid or verification failed
};

const refreshTokenDBChecker = async (refreshToken) => {};

module.exports = {
  accessTokenChecker,
  refreshTokenChecker
};
