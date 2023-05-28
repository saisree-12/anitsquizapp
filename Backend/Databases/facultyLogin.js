const mongoose = require('mongoose');

const facLogin_schema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    uname:String,
    pwd:String,
    faculty_name:String,
})

module.exports = mongoose.model("flogin",facLogin_schema) 