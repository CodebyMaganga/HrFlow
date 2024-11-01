const mongoose = require('mongoose')


const Schema = mongoose.Schema


const attendanceSchema = new Schema({
    employee:{
        type: Schema.Types.ObjectId,
        ref: "Employee",

    },
    date:{
        type: Date,
        default: null
    },
    checkIn:{
        type: String,
        default: null
    },
    checkOut:{
        type: String,
        default: null
    },

}, {timestamps: true})

module.exports = mongoose.model('Attendance', attendanceSchema)