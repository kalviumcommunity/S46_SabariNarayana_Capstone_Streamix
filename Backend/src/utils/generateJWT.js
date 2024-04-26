const jwt = require('jsonwebtoken');
const config = require('@config/config.js'); // Assuming you have a centralized config file

function TokenGenerator(data, time) {
  // Ensure data is provided
  if (!data) {
    throw new Error('Data is required to generate access token');
  }

  try {
    // Sign the JWT token with the provided data and expiration time
    const accessToken = jwt.sign({ data }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: time
    });

    return accessToken;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate access token');
  }
}

module.exports = {
  TokenGenerator
};
