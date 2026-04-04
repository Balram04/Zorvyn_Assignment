const express = require('express');
const { body } = require('express-validator');

const verifyToken = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  getUsers,
  createUser,
  updateUserRole,
  updateUserStatus
} = require('../controllers/user.controller');

const router = express.Router();

router.use(verifyToken, checkRole('admin'));

router.get('/', getUsers);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 chars'),
    body('role').optional().isIn(['viewer', 'analyst', 'admin'])
  ],
  validate,
  createUser
);

router.patch(
  '/:id/role',
  [body('role').isIn(['viewer', 'analyst', 'admin']).withMessage('Valid role required')],
  validate,
  updateUserRole
);

router.patch(
  '/:id/status',
  [body('isActive').isBoolean().withMessage('isActive must be true or false')],
  validate,
  updateUserStatus
);

module.exports = router;