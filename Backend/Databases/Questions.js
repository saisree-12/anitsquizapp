const mongoose = require('mongoose')

const Questions = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    quesid:String,
    topic_name:String,
    subName:String,
    question:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    answer:String
})

module.exports = mongoose.model('question',Questions)
