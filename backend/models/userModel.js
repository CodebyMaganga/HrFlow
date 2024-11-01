const mongoose = require('mongoose')

//
const Schema = mongoose.Schema

const employeeSchema = new Schema({

  employeeID:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  DOB: {
    type: Date,
    trim: true,
    default: null
  },
  profilePicture: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  phoneNumber:{
    type: String,
    default: ''
  },
  address:{
    type: String,
    default: ''
  },
  gender:{
    type: String,
    default:''
  },
  salary:{
    type: Number,
    default: 0
  },
  jobTitle:{
    type: String,
    default: ''
  },
  DOJ:{
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'On Leave', 'Terminated'],
    default: 'Active'
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
},{timestamps:true});

module.exports = mongoose.model('Employee', employeeSchema);

  