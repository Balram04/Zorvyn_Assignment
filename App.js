const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();
const authRoutes = require('./src/routes/auth.routes');
const recordRoutes = require('./src/routes/record.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');

const app = express();

app.use(express.json());
//health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Zorvyn Assignment API is running' });
});
// Routes
app.use('api/auth', authRoutes);
app.use('api/records', recordRoutes);
app.use('api/dashboard', dashboardRoutes);


// Connect to MongoDB
connectDB();    
//server listening
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);    
});

module.exports = app;