const mongoose = require('mongoose');
const fclasses_schema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    uname:String,
    class_id:String,
    subName:String,
    subId:String,
}) 
module.exports = mongoose.model('fclasse',fclasses_schema)  
