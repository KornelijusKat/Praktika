const mongoose = require('mongoose')

const advertisementSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
    }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})
module.exports = mongoose.model("Advertisement", advertisementSchema)
