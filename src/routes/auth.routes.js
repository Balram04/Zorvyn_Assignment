const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
const validate = require('../middlewares/validate.middleware');

router.post('/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 chars')
  ], validate,
  register
);
router.post('/login', login);
router.post('/logout', verifyToken, logout);

module.exports = router;    