const mongoose = require('mongoose')

const advertisementSchema = mongoose.Schema({
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
        type:String,
        required:true
    },

    comments:{
        type:Array
    }

})
const Advertisement = mongoose.model("Advertisemeent", advertisementSchema)
module.exports = Advertisement