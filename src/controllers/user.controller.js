const bcrypt = require('bcryptjs');
const User = require('../models/User');

const toSafeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (pageNumber - 1) * pageSize;

    const [users, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize),
      User.countDocuments()
    ]);

    res.json({
      data: users.map(toSafeUser),
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        pages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role = 'viewer' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'User created successfully', user: toSafeUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User role updated', user: toSafeUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User status updated', user: toSafeUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};