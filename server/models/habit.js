const mongoose = require('mongoose');
const HabitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily',
  },
  streak: {
    type: Number,
    default: 0,
  },
  completionHistory: [{
    type: Date,
  }],
}, { timestamps: true });

const Habit = mongoose.model('Habit', HabitSchema);
module.exports = Habit;
