const { UserModel } = require('../Schema')

const FetchUserPass = async (email) => {
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            return {
                id: user._id.toString(),
                email: user.email,
                password: user.password,
            }
        } else {
            return { UserExist: false }
        }
    } catch (error) {
        // Handle error
        console.error('Error fetching email and password:', error.message)
        // Return false in case of error
        return false
    }
}

// Exporting functions and router for use in other modules
module.exports = {
    FetchUserPass,
}
