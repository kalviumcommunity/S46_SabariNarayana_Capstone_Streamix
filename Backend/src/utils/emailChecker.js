const { UserModel } = require('../models/Schema')

const validateEmail = async (email) => {
    try {
        // Check if there is a user with the provided email
        const user = await UserModel.findOne({ email })
        // console.log(!!user)
        // Return true if user exists; otherwise, return false
        return !!user
    } catch (error) {
        // Handle error
        console.error('Error validating email:', error.message)
        // Return false in case of error
        return false
    }
}

// Exporting functions and router for use in other modules
module.exports = {
    validateEmail,
}
