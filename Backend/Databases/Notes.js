const mongoose = require('mongoose')

const Notes = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    classId:String,
    username:String,
    subId:String,
    cName:String,
    fName:String,
    fPath:String,
})

module.exports = mongoose.model('note',Notes)