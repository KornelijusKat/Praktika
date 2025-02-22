const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signToken = (newUser) =>{
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
        const { email, password } = req.body;
        console.log(req.body.email)
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(404).json({
                status:"failed",
                message:'User not found, please input correct credentials'
        })
        }
        console.log(password)
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {return res.status(400).json({ 
            status: 'failed',
            message: "Invalid credentials" });
        }
        const token = signToken(user._id);
        console.log(token)
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