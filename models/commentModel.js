const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:(true,"Please write comment")
    }
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment;