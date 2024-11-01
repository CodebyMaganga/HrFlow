const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidate: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  interviewDate: {
    type: Date,
    required: true,
  },
  interviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', 
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Canceled'],
    default: 'Scheduled',
  },
  feedback: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },

},{timestamps: true});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
