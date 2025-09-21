const mongoose = require('mongoose');
const GoalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'on-hold'],
    default: 'in-progress',
  },
  targetDate: {
    type: Date,
    required: false,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
}, { timestamps: true });

const Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;