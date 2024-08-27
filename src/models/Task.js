const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  // If you want to associate tasks with users:
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true // Reference to your User model
  },
});

module.exports = mongoose.model('Task', taskSchema);
