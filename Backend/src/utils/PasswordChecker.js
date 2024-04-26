const bcrypt = require('bcrypt');

const passwordChecker = async (givenPass, FetchPass) => {
  const match = await bcrypt.compare(givenPass, FetchPass);
  return match;
};

// Exporting functions and router for use in other modules
module.exports = {
  passwordChecker
};
