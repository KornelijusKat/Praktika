const Comment = require('../models/commentModel');
const Advertisement = require('../models/advertisementModel');

exports.createComment = async (req, res) => {
    try {
        const { advert, content, user } = req.body;
        const advertisement = await Advertisement.findById(advert);
       
        if (!advertisement) {
            return res.status(404).json({ message: "Advertisement not found" });
        }
        const newComment = await Comment.create({ advert, user,content });
        advertisement.comments.push(newComment._id);
        await advertisement.save();
        console.log(newComment)  
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCommentsByAd = async (req, res) => {
    try {
        const { advertId } = req.params;
        const comments = await Comment.find({ advert: advertId }).populate('user', 'name');
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};