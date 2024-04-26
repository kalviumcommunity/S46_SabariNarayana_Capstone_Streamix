const { UserModel } = require('./schema');

exports.fetchUserPass = async (email) => {
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return {
        id: user._id.toString(),
        email: user.email,
        password: user.password,
        provider: user.provider
      };
    } else {
      return { UserExist: false };
    }
  } catch (error) {
    console.error('Error fetching email and password:', error.message);
    throw error; // Throw the error instead of returning false
  }
};

exports.postUser = async (userData) => {
  // Saving user data to database
  const newUser = new UserModel(userData);
  await newUser.save();
  return newUser;
};
