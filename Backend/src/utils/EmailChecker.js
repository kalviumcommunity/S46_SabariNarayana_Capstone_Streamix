const mdResolver = require('@mongodb/resolver');

const validateEmail = async (email) => {
  // console.log(email)
  try {
    const user = await mdResolver.fetchUserPass(email);
    console.log(user);
    if (user.email === email) {
      return {
        id: user.id,
        UserExist: true,
        password: user.password,
        provider: user.provider
      };
    } else if (!user.UserExist) {
      return { UserExist: false };
    }
  } catch (error) {
    // Handle error
    console.error('Error validating email:', error.message);
    // Return false in case of error
    return false;
  }
};
// Exporting functions and router for use in other modules
module.exports = {
  validateEmail
};
