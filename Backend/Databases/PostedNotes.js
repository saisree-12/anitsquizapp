const mongoose = require('mongoose')

const PostedNotes = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    notesid:String,
    UnitName:String,
    SubjectName:String,
    class_id:String
})

module.exports = mongoose.model('postednote',PostedNotes)