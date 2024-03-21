const { validateEmail } = require('../utils/emailChecker')
const { UserModel } = require('../models/Schema')

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
        console.log(req.body) // Log the request body
        // Destructuring required data from request body
        const { name, password, email } = req.body
        if (await validateEmail(email)) {
            return res.status(200).json({ emailExists: true })
        }
        const userData = {
            name,
            password,
            email,
        }
        // Saving user data to database
        const newUser = new UserModel(userData)
        await newUser.save()
        // Perform any necessary operations with the request data
        // For example, save the user data to a database
        // Send a success response
        res.status(201).json({
            emailExists: false,
            message: 'User created successfully',
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}
