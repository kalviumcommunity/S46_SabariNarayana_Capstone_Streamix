const mdResolver = require('@mongodb/resolver');
const { TokenGenerator } = require('./generateJWT');

const assignToken = async (id) => {
  const accessToken = TokenGenerator(id, '15m');
  const refreshToken = TokenGenerator(id, '7d');

  await mdResolver.putRefreshToken(id, refreshToken);

  return { accessToken, refreshToken };
};

// Exporting functions and router for use in other modules
module.exports = {
  assignToken
};
