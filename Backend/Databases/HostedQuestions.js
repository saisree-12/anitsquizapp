const mongoose = require('mongoose')

const HostedQuestions = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    quizid:String,
    quesids:Array
})

module.exports = mongoose.model('hostedquestion',HostedQuestions)