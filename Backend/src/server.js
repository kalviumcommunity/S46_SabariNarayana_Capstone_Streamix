require('module-alias/register');
const cors = require('cors');
const express = require('express');
const route = require('@routes/routes');
const { connectToDatabase, isConnected } = require('@mongodb/db');
const cookieParser = require('cookie-parser');

// Create the Express.js app
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ credentials: true, origin: true, withCredentials: true }));
app.use(cookieParser());
app.use('/api', route);

app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
    await connectToDatabase();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
