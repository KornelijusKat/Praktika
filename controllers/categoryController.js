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
exports.updateCategory = async(req,res) =>{
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
exports.deleteCategory = async(req, res) =>{
    try{
        console.log(req.params.id)
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) return res.status(404).json({ message: "Category not found" });
        return res.status(204).json({
            message:'Deteleted',
            data:category
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
