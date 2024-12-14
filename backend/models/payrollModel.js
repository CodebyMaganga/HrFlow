const mongoose = require('mongoose')

const Schema = mongoose.Schema


const payrollSchema = new Schema({
    employees:{
        type:[Schema.Types.ObjectId],
        ref: "Employee",
        required: true
    },
   payrollDate:{
    type: Number,
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
module.exports = mongoose.model('Payroll', payrollSchema)