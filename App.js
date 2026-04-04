const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();

const app = express();
// Connect to MongoDB
connectDB();    
// Middleware
app.use(express.json());
//health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Zorvyn Assignment API is running' });
});


//server listening
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);    
});

module.exports = app;