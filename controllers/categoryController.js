const Category = require('../models/categoryModel')

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateCategories = async(req,res) =>{
    try{
        const category = await Category.findByIdAndUpdate(req.params.id,req.body)
        if (ad.user.toString() !== req.user.id) return res.status(403).json({ 
            message: "Unauthorized" 
        });
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:err.message
        })
    }
}
