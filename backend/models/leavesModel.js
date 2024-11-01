const mongoose = require('mongoose')

const Schema = mongoose.Schema


const leavesSchema = new Schema({
    leaveID:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    employee:{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    leaveType:{
        type: String,
        enum: ['Annual', 'Maternity', 'Paternity', 'Medical'],
        default: 'Annual'
    },
    startDate:{
        type: Date,
        default: null
    },
    endDate:{
        type: Date,
        default: null
    },
    status:{
        type: 'String',
        enum: ['Pending', 'Approved', 'Rejected']
    },

},{timestamps: true})

module.exports = mongoose.model('Leave', leavesSchema)