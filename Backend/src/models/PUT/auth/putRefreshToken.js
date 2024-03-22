const { UserModel } = require('../../Schema')

const putRefreshToken = async (id, refreshToken) => {
    try {
        // Find the user by ID and push the new refresh token to the refreshToken array
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: id },
            { $push: { refreshToken: refreshToken } } // Append the new token to the refreshToken array
        )

        console.log('Refresh token appended successfully.')
        return updatedUser
    } catch (error) {
        console.error('Error appending refresh token:', error.message)
        throw error // Rethrow the error to handle it in the calling code
    }
}

// Exporting function for use in other modules
module.exports = {
    putRefreshToken,
}
