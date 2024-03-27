const { putRefreshToken } = require('../../models/PUT/auth/putRefreshToken')
const { accessTokenGenerator, refreshTokenGenerator } = require('./generateJWT')

const assignToken = async (id) => {
    const accessToken = accessTokenGenerator(id, '15m')
    const refreshToken = refreshTokenGenerator(id, '7d')

    await putRefreshToken(id, refreshToken)

    return { accessToken, refreshToken }
}

// Exporting functions and router for use in other modules
module.exports = {
    assignToken,
}
