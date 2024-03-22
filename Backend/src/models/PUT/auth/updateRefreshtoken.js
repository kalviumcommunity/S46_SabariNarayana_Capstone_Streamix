const { UserModel } = require('../../Schema')

const updateRefreshToken = async (id, oldRefreshToken, newRefreshToken) => {
    try {
        // Find the user by ID and update the refreshToken array
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: id },
            {
                $pull: { refreshToken: oldRefreshToken },
                $push: { refreshToken: newRefreshToken },
            },
            { new: true }
        )

        if (!updatedUser) {
            throw new Error('User not found')
        }

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
