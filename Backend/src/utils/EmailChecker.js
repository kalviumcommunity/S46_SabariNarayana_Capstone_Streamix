const { fetchUserPass } = require('@mongodb/resolver');

const validateEmail = async (email) => {
  try {
    const user = await fetchUserPass(email);
    console.log('Fetched user:', user);

    if (user.email === email) {
      return {
        id: user.id,
        UserExist: true,
        password: user.password,
        provider: user.provider
      };
    } else {
      return { UserExist: false };
    }
  } catch (error) {
    console.error('Error validating email:', error.message);
    return { UserExist: false, error: error.message }; // Return a consistent object structure
  }
};

module.exports = {
  validateEmail
};
