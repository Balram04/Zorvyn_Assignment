const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount:{
    type: Number,
    required: true,
    min: 0
  },
  type:{ 
    type: String,
     enum: ["income", "expense"] 
    },
  category:{
    type: String,
    enum: ["salary", "freelance", "investment", "gift", "food", "rent", "utilities", "entertainment", "other"]
  },
  date: { 
    type: Date, 
    default: Date.now 
},
  note: {
    type: String,
    maxlength: 500
},
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" }
});

module.exports = mongoose.model("Transaction", transactionSchema);