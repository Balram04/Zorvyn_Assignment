const Record = require('../models/Record');

// CREATE (Admin only)
exports.createRecord = async (req, res) => {
  try {
    const record = await Record.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET (Role-based behavior)
exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = {
      isDeleted: false
    };

    // 🔥 IMPORTANT: user-specific data
    if (req.user.role !== 'admin') {
      filter.userId = req.user.id;
    }

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const records = await Record.find(filter).sort({ date: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE (Admin only)
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE → SOFT DELETE (better design)
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted (soft)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};