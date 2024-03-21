// app.js
const express = require('express');
const app = express();
const testRoutes = require('./routes/testRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api', testRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});