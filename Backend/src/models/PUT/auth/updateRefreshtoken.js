const { UserModel } = require('../../Schema')

const updateRefreshToken = async (id, oldRefreshToken, newRefreshToken) => {
    try {
        // Find the user by ID
        const user = await UserModel.findById(id)

        if (!user) {
            throw new Error('User not found')
        }

        // Remove the old refresh token from the array
        const refreshTokenArray = user.refreshToken.filter(
            (token) => token !== oldRefreshToken
        )

        // Add the new refresh token to the array
        refreshTokenArray.push(newRefreshToken)

        // Update the user document with the modified refreshToken array
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { refreshToken: refreshTokenArray },
            { new: true }
        )

        console.log('Refresh token updated successfully.')
        return updatedUser
    } catch (error) {
        console.error('Error updating refresh token:', error.message)
        throw error // Rethrow the error to handle it in the calling code
    }
}

// Exporting function for use in other modules
module.exports = {
    updateRefreshToken,
}
