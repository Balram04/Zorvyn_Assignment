const Record = require('../models/record.model');

exports.getSummary = async (req, res) => {
  try {
    const matchStage = {
      isDeleted: false,
      userId: req.user.role === 'admin' ? { $exists: true } : req.user.id
    };

    const result = await Record.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let income = 0;
    let expense = 0;

    result.forEach(item => {
      if (item._id === 'income') income = item.total;
      if (item._id === 'expense') expense = item.total;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//categrory wise summary
exports.getCategorySummary = async (req, res) => {
  try {
    const matchStage = {
      isDeleted: false,
      userId: req.user.role === 'admin' ? { $exists: true } : req.user.id
    };

    const result = await Record.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//monthly summary
exports.getMonthlyTrends = async (req, res) => {
  try {
    const matchStage = {
      isDeleted: false,
      userId: req.user.role === 'admin' ? { $exists: true } : req.user.id
    };

    const result = await Record.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//recent activity
exports.getRecentActivity = async (req, res) => {
  try {
    const filter = {
      isDeleted: false
    };

    if (req.user.role !== 'admin') {
      filter.userId = req.user.id;
    }

    const records = await Record.find(filter)
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};