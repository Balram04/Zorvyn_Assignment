const express = require('express');
const router = express.Router();

const {
  getSummary,
  getCategorySummary,
  getMonthlyTrends,
  getRecentActivity
} = require('../controllers/dashboard.controller');

const verifyToken = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');


// Analyst + Admin can access dashboard
router.get('/summary', verifyToken, checkRole('admin', 'analyst'), getSummary);
router.get('/categories', verifyToken, checkRole('admin', 'analyst'), getCategorySummary);
router.get('/trends', verifyToken, checkRole('admin', 'analyst'), getMonthlyTrends);
router.get('/recent', verifyToken, checkRole('admin', 'analyst'), getRecentActivity);

module.exports = router;