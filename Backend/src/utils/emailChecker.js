const { FetchUserPass } = require('../models/GET/UserPass')

const validateEmail = async (email) => {
    // console.log(email)
    try {
        const user = await FetchUserPass(email)
        if (user.email === email) {
            return { id: user.id, UserExist: true, password: user.password }
        } else if (!user.UserExist) {
            return { UserExist: false }
        }
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
