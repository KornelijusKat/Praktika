const Advert = require('../models/advertisementModel')


exports.getAllAds = async(req,res) =>{

}
exports.getAllAdsByCategory = async(req,res) =>{
    
}
exports.createAdvert = async(req,res) =>{
    try{
        const response = await Advert.create(req.body);
        return res.status(201).json({
            status: "success",
            message: "Advert has been created"
    })
    }catch(err){
        return res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
    

}
exports.updateAdvertById = async(req,res) =>{
    
}
exports.deleteAdvertByID = async(req,res) =>{
    
}