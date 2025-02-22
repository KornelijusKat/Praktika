const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const signToken = (id) =>{
    return  token = jwt.sign(
        {id:newUser._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
}
exports.signup= async(req, res) =>{
    try{
        const newUser = await User.create(req.body)
        const token = jwt.sign(
            {id:newUser._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
        return res.status(201).json({
            status:"success",
            data: newUser,
            token
    })
    }catch(err){
        return res.status(500).json({
            status:"failed",
            message:err.message
    })
    }
}
exports.login = async(req,res) => {
    try{
        const user = await User.findOne(req.body.email).select('+password');
        if(!user){
            return res.status(404).json({
                status:"failed",
                message:'User not found, please input correct credentials'
        })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ 
            status: 'failed',
            message: "Invalid credentials" });
        const token = signToken(user._id);
        return res.status(201).json({
            data:{
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:err.message
        })
    }
}