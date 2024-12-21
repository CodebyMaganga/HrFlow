require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const usersRoute = require('./routes/users')
const departmentRoute = require('./routes/departments')
const leaveRoute = require('./routes/leaves')
const attendanceRoute = require('./routes/attendance')
const benefitRoute = require('./routes/benefits')
const interviewRoute = require('./routes/interview')
const payrollRoute = require('./routes/payroll')

//restart
const app = express()

//middleware
app.use(express.json())
app.use(logPath)


app.get('/', (req,res)=>{
    res.json({message: 'You are at home'})
})

//routes

app.use('/users', usersRoute)
app.use('/departments',departmentRoute)
app.use('/leaves',leaveRoute)
app.use('/attendance', attendanceRoute)
app.use('/benefits', benefitRoute)
app.use('/interviews', interviewRoute)
app.use('/payroll', payrollRoute)




//db connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,(req, res)=>{
        console.log(req)
        console.log('Connected to db & listening on port 4000')
    })
}).catch((err) =>{
    console.error('error:',err)
})


function logPath(req,res,next){
    
    console.log(req.path, req.method)
    next()
}