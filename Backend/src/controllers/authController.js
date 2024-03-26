const { validateEmail } = require('../utils/emailChecker')
const { passwordChecker } = require('../utils/passwordChecker')
const { postUser } = require('../models/POST/auth/postUser')
const { tokenAssigning } = require('../middleware/Auth/tokenAssigning')
const {
    accessTokenGenerator,
    refreshTokenGenerator,
} = require('../middleware/Auth/generateJWT')
const {
    accessTokenChecker,
    refreshTokenChecker,
} = require('../middleware/Auth/TokenCheking')
const { updateRefreshToken } = require('../models/PUT/auth/updateRefreshtoken')

// google auth import
const { OAuth2Client } = require('google-auth-library')
const google = require('googleapis').google

exports.getTest = (req, res) => {
    try {
        // You can add any logic or data processing here
        const testData = {
            message: 'Hello, World!',
            timestamp: new Date().toISOString(),
        }

        // Send the test data as a JSON response
        res.status(200).json(testData)
    } catch (err) {
        // Handle errors
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

exports.postSignup = async (req, res) => {
    console.log('signup')
    try {
        // console.log(req.body) // Log the request body
        // Destructuring required data from request body
        const { name, password, email } = req.body
        const userExists = await validateEmail(email)
        if (userExists.UserExist) {
            return res.status(200).json({ emailExists: true })
        }
        const userData = {
            name,
            password,
            email,
            provider: 'email',
        }
        // Database Function for setting user
        await postUser(userData)

        res.status(201).json({
            emailExists: false,
            message: 'User created successfully',
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

exports.postSignin = async (req, res) => {
    console.log('signin')
    try {
        // Destructuring required data from request body
        const { password, email } = req.body
        // fetching data from DB
        const userExists = await validateEmail(email)
        // console.log('first == ', userExists)
        if (userExists.provider === 'google') {
            // Corrected typo: flase to false
            return res.status(200).json({
                error: false,
                emailExists: true,
                google: true,
                message: 'Login with Google',
            })
        }
        // Email Validation
        if (!userExists.UserExist) {
            // Corrected typo: flase to false
            return res.status(200).json({
                error: false,
                emailExists: false,
                google: false,
                message: 'User does not exist',
            })
        }
        // Password Validation
        if (!(await passwordChecker(password, userExists.password))) {
            return res.status(200).json({
                emailExists: true,
                google: false,
                message: 'Password incorrect',
            })
        }
        // Token assignment
        const { accessToken, refreshToken } = await tokenAssigning(
            userExists.id
        )

        // Set access token as cookie
        res.cookie('access_token', accessToken, { httpOnly: true })

        // Set refresh token as cookie
        res.cookie('refresh_token', refreshToken, { httpOnly: true })

        res.status(200).json({
            emailExists: true,
            accessToken,
            refreshToken,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

exports.checkUser = async (req, res) => {
    try {
        // Retrieve cookies from the request
        const accessToken = req.cookies.access_token
        const refreshToken = req.cookies.refresh_token

        // Check the validity of the access token
        const isAccessTokenValid = await accessTokenChecker(accessToken)

        // If the access token is valid, respond to the client
        if (isAccessTokenValid) {
            return res
                .status(200)
                .json({ success: true, accessToken, refreshToken })
        }

        // If the access token is not valid, check the refresh token
        const refreshData = await refreshTokenChecker(refreshToken)

        // If the refresh token is valid, generate new access and refresh tokens
        if (refreshData.valid) {
            // Generate new tokens
            const newAccessToken = accessTokenGenerator(refreshData.id, '15m')
            const newRefreshToken = refreshTokenGenerator(refreshData.id, '7d')

            await updateRefreshToken(
                refreshData.id.data,
                refreshToken,
                newRefreshToken
            )

            // // Set the new access and refresh tokens as cookies
            res.cookie('access_token', newAccessToken, { httpOnly: true })
            res.cookie('refresh_token', newRefreshToken, { httpOnly: true })

            // Respond to the client with new tokens
            return res.status(200).json({
                success: true,
                // accessToken: newAccessToken,
                // refreshToken: newRefreshToken,
            })
        }

        // If both access and refresh tokens are invalid, respond with an error
        return res.status(401).json({ error: 'Unauthorized' })
    } catch (error) {
        console.error('Error retrieving cookies:', error)
        return res.status(500).json({ error: 'Server error' })
    }
}

// Google Auth

exports.googleCallback = async (req, res) => {
    const REDIRECT_URI = process.env.REDIRECT_URI
    const client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        REDIRECT_URI
    )
    const { code } = req.query

    try {
        const { tokens } = await client.getToken(code)
        client.setCredentials(tokens)

        // Get user information from Google
        const oauth2 = google.oauth2({ version: 'v2', auth: client })
        const userInfo = await oauth2.userinfo.get()

        const userExists = await validateEmail(userInfo.data.email)
        // console.log(userExists)

        if (!userExists.UserExist) {
            const newUser = {
                name: userInfo.data.name,
                email: userInfo.data.email,
                provider: 'google',
            }
            // Database Function for setting user
            const data = await postUser(newUser)
            userExists.id = data._id.toString()
            // userExists.id = await postUser(newUser).id
        }

        const { accessToken, refreshToken } = await tokenAssigning(
            userExists.id
        )

        // Set access token as cookie
        res.cookie('access_token', accessToken, { httpOnly: true })

        // Set refresh token as cookie
        res.cookie('refresh_token', refreshToken, { httpOnly: true })

        // Save the user to your database or do any other necessary operations
        // ...
        res.redirect(303, `${process.env.FRONTEND_URL}/dashboard`)
        // Redirect the user to the desired page after successful authentication
    } catch (err) {
        console.error('Error authenticating with Google:', err)
        res.redirect(303, `${process.env.FRONTEND_URL}/signin?status=failed`)
    }
}

exports.googleAuth = async (req, res) => {
    const REDIRECT_URI = process.env.REDIRECT_URI
    const client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        REDIRECT_URI
    )
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile email'],
        prompt: 'consent',
    })

    // console.log(authUrl)

    res.json({ authURL: authUrl })
}
