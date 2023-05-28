const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    regno:String,
    pwd:String,
    student_name:String
})

module.exports = mongoose.model('slogin',StudentSchema)