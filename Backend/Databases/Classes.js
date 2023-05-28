const mongoose = require('mongoose')

const Class = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    class_id:String,
    class_name:String,
    mail:String,
    nos:Number
})

module.exports = mongoose.model('Classe',Class)