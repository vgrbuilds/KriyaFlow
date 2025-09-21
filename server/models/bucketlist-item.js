const mongoose = require('mongoose');
const BucketlistItemSchema = new mongoose.Schema({
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
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedDate: {
    type: Date,
    required: false,
  },
}, { timestamps: true });

const BucketlistItem = mongoose.model('BucketlistItem', BucketlistItemSchema);
module.exports = BucketlistItem;