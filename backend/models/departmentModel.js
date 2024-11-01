const mongoose = require('mongoose')


const Schema = mongoose.Schema


const departmentSchema = new Schema({
    departmentID:{
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
      }]
    
},{timestamps: true})

module.exports = mongoose.model('Department', departmentSchema);