const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;