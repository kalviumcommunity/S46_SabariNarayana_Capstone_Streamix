const jwt = require('jsonwebtoken')

const accessTokenChecker = async (accessToken) => {
    try {
        const data = await jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        )
        if (data) {
            return true // Access token is valid
        }
    } catch (error) {
        console.error('No Access Token')
    }
    return false // Access token is invalid or verification failed
}

const refreshTokenChecker = async (refreshToken) => {
    try {
        const data = await jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        if (data) {
            return { valid: true, id: data.data }
        } // Refresh token is valid
    } catch (error) {
        console.error('Error verifying refresh token:', error)
    }
    return false // Refresh token is invalid or verification failed
}

const refreshTokenDBChecker = async (refreshToken) => {}

module.exports = {
    accessTokenChecker,
    refreshTokenChecker,
}
