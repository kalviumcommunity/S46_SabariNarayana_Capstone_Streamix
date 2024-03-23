const jwt = require('jsonwebtoken')

function accessTokenGenerator(data, time) {
    // Ensure data is provided
    if (!data) {
        throw new Error('Data is required to generate access token')
    }

    try {
        // Sign the JWT token with the provided data and expiration time
        const accessToken = jwt.sign(
            { data },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: time,
            }
        )

        return accessToken
    } catch (error) {
        console.error(error)
        throw new Error('Failed to generate access token')
    }
}

function refreshTokenGenerator(data, time) {
    // Ensure data is provided
    if (!data) {
        throw new Error('Data is required to generate refresh token')
    }

    try {
        // Sign the JWT token with the provided data and expiration time
        const refreshToken = jwt.sign(
            { data },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: time,
            }
        )

        return refreshToken
    } catch (error) {
        console.error(error)
        throw new Error('Failed to generate refresh token')
    }
}

module.exports = {
    accessTokenGenerator,
    refreshTokenGenerator,
}
