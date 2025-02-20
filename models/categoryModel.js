const mongoose = require('mongoose')
const Advertisement = require('./advertisementModel')

const categorySchema =  new mongoose.Schema({
    name:{
        type:String,
        required:(true,"Please enter category name")
    },
    Advertisements:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Advertisement"
        }
    ]

})
const Category = mongoose.model('Category', categorySchema)
module.exports = Category;