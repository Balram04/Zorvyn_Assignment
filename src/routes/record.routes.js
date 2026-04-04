const express = require('express');
const router = express.Router();

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require('../controllers/record.controller');

const verifyToken = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');


// Viewer  → cannot access records
// Analyst + Admin 
router.get('/', verifyToken, checkRole('admin', 'analyst'), getRecords);

// Only Admin can modify
router.post('/', verifyToken, checkRole('admin'), createRecord);
router.put('/:id', verifyToken, checkRole('admin'), updateRecord);
router.delete('/:id', verifyToken, checkRole('admin'), deleteRecord);

module.exports = router;