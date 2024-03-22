const { UserModel } = require('../../Schema')

const postUser = async (userData) => {
    // Saving user data to database
    const newUser = new UserModel(userData)
    await newUser.save()
}

// Exporting functions and router for use in other modules
module.exports = {
    postUser,
}
