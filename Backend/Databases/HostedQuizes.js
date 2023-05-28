const mongoose = require('mongoose')

const Hosted = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    quizid:String,
    QuizName:String,
    SubjectName:String,
    topicname:String,
    noqs:Number,
    marks:Number,
    class_id:{
        type:String,
        required:true
    },
    quizdate:String,
    quiztime:String,
    duration:Number,
    username:String,
    subId:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('HostedQuize',Hosted)