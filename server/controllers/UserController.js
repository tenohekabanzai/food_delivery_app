const {User} = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const JWT_SECRET = "random#secret";

const createToken = (id)=>{
    return jwt.sign({id},JWT_SECRET);
}
// login user
const loginUser = async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try {
        const exists = await User.findOne({email});
        if(!exists)
        return res.json({success:false,message:"User does not exist"});
        const isMatch = await bcrypt.compare(password,exists.password);
        if(!isMatch)
        return res.json({success:false,message:"Enter correct password"});

        const token = createToken(exists._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Login Failed"});
    }
}



// register user
const registerUser = async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        const exists = await User.findOne({email});
        if(exists)
        return res.json({success:false,message:"User already exists"});
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Enter proper Email"});
        }
        if(password.length < 5)
            return  res.json({success:false,message:"Please enter a strong Password"});

        // hashing password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const resp1 = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            cartData:{}
        });
        const token = createToken(resp1._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to Register User!"});
    }
}

module.exports = {loginUser,registerUser};