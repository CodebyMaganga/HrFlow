const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruitmentSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  jobDescription: {
    type: String,
    required: true,
    trim: true
  },
  salaryRange: {
    type: String,
    required: true
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  applicantDetails: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    contactInfo: {
      type: String,
      required: true,
      trim: true
    },
    resume: {
      type: String,  // Store resume as file path or URL
      required: true
    }
  },
  applicationStatus: {
    type: String,
    enum: ['Applied', 'Interviewed', 'Hired', 'Rejected'],
    default: 'Applied'
  },
  interviewDate: {
    type: Date
  },
  interviewer: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'  // Refers to the employee who conducted the interview
  }
}, { timestamps: true });

module.exports = mongoose.model('Recruitment', recruitmentSchema);
