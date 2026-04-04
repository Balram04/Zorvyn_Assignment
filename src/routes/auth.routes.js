const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');

router.post('/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 chars')
  ], validate,
  register
);
router.post('/login', login);

module.exports = router;    