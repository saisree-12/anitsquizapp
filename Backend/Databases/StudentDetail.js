const mongoose = require('mongoose')

const Sdetails = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    regno:String,
    student_name:String,
    class_id:String
})

module.exports = mongoose.model('StudentDetail',Sdetails)