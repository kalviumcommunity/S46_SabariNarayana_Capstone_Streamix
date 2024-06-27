const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('@config/config.js'); // Use destructuring for clarity

const verifyToken = async (token, secret, tokenType) => {
  try {
    const data = await jwt.verify(token, secret);
    if (data) {
      return { valid: true, id: data.data };
    }
  } catch (error) {
    console.error(`Error verifying ${tokenType}:`, error.message);
  }
  return { valid: false, id: null };
};

const accessTokenChecker = async (accessToken) => {
  return verifyToken(accessToken, ACCESS_TOKEN_SECRET, 'access token');
};

const refreshTokenChecker = async (refreshToken) => {
  console.log('Verifying refresh token:', refreshToken);
  return verifyToken(refreshToken, ACCESS_TOKEN_SECRET, 'refresh token');
};

module.exports = {
  accessTokenChecker,
  refreshTokenChecker
};
