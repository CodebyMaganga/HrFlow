const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const terminationSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  terminationDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  exitInterview: {
    type: String,
    trim: true  
  },
  severancePay: {
    type: Number, 
    default: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Termination', terminationSchema);
