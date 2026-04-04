const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const recordRoutes = require('./src/routes/record.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');
const userRoutes = require('./src/routes/user.routes');
const errorHandler = require('./src/middlewares/error.middleware');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
//health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Zorvyn Assignment API is running' });
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
// Connect to MongoDB
connectDB();    
app.use(errorHandler);
//server listening
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);    
});

module.exports = app;