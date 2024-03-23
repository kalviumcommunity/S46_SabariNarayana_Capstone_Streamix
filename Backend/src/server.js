// app.js
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/routes') // Import routes from a separate file
const { connectToDatabase, isConnected } = require('./models/Database') // Import database functions from a separate file
const cookieParser = require('cookie-parser')

// Middleware
app.use(express.json())
app.use(cors({ credentials: true, origin: true, withCredentials: true }))
app.use(cookieParser())

// Routes
app.use('/api', routes)

app.get('/ping', (req, res) => {
    res.send({ message: 'pong' })
})

app.get('/', async (req, res) => {
    try {
        if (isConnected()) {
            console.log('Connected to MongoDB')
            res.json({ connectionStatus: 'connected' })
        } else {
            console.log(' Disconnected from MongoDB')
            res.json({ connectionStatus: 'Disconnected' })
        }
    } catch (error) {
        console.error('Error connecting to database:', error)
        res.status(500).json({ error: 'Failed to connect to database' })
    }
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(
        '----------------------------------------------------------------'
    )
    console.log(`Server is running on port ${PORT}`)
    connectToDatabase()
})
