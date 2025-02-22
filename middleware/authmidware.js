const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.adminOnly = async(req, res, next) =>{
    try{
    const user = await User.findById(req.params.id)
    if(user.role != 'admin'){
        return res.status(403).json({
            status:'failed',
            message:'unauthorized'
        })
    }
    next()
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:err.message
        })
    }

}
exports.authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    if (!token) return res.status(401).json({ 
        message: "Access denied. Missing token" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};