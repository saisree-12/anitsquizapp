const mongoose = require('mongoose')

const Subjects = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    subid:String,
    subName:String,
    ac_year:Number,
    semister:Number,
    class_id:String
})

module.exports = mongoose.model('subject',Subjects)