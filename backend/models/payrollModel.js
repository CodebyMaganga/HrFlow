const mongoose = require('mongoose')

const Schema = mongoose.Schema


const payrollSchema = new Schema({
    employee:{
        type:Schema.Types.ObjectId,
        ref:'Employee',
        required: true
    },
   salary:{
    type: Number,
    default: 0,
    required: true
   },
   deductions:{
    type: Number,
    default: 0,
    required: true
   },
   bonuses:{
    type: Number,
    default: 0,
    required: true
   },
   earnings:{
    type: Number,
    default: 0,
    required: true
   },
   payrollDate:{
    type: Number,
    default: null,
    required: true
   },
   month: {
    type: String,
    enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    required: true
},
year: {
    type: Number,
    required: true
},
    
})
module.exports = mongoose.Model('Payroll', payrollSchema)