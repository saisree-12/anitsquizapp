const mongoose = require('mongoose')

const Ongoing = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    quizid:String,
    class_id:String
})

module.exports = mongoose.model('OngoingQuize',Ongoing)