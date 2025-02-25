const Advert = require('../models/advertisementModel')

exports.getAdById = async (req, res) =>{
    try {
        const ad = await Advert.findById(req.params.id)//.populate("category user");
        if (!ad) return res.status(404).json({ 
            message: "Ad not found" 
        });
        return res.json(ad);
    } catch (err) {
        return res.status(500).json({ 
            error: err.message 
        });
    }
};
exports.getAllAds = async(req,res) =>{
    try {
        const ads = await Advert.find();
        if(ads.length === 0){
            return res.status(404).json({
                status:'failed',
                mesassage:'No adds in database'
            })
        }
        return res.status(200).json({ads});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
exports.getAllAdsByCategory = async(req,res) =>{
    try {
        const ads = await Ad.find(req.params.categoryId);
        if(ads){
            return res.json({
                status:'failed',
                mesassage:'No corresponding ads in database'
            })
        }
        return res.json({
            status:'success',
            data:ads});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
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
exports.updateAd = async (req, res) => {
    try {
        const ad = await Advert.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ad) {
            return res.status(404).json({ message: "Advert not found" });
        }
        return res.json({
            status:'success',
            data: ad
        });
    } catch (err) {
        returnres.status(500).json({ 
            status:'failed',
            error: err.message 

        });
    }
};
exports.deleteAdvertByID = async(req,res) =>{
    try{
        console.log('hie')
        const ad = await Advert.findById(req.params.id)
        console.log(ad)
        if (!ad) {
            return res.status(404).json({ message: "Advert not found" });
        }
     
        const deletedAdvert = await Advert.findByIdAndDelete(req.params.id)
        return res.status(204).json({
            message: "success"
        })
    }catch(err){
        return res.status(500).json({ 
            status: "failed",
            message:err.mesassage 
        });
    }
}