const jwt = require('jsonwebtoken');

const JWT_SECRET = "random#secret";

const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token)
    return res.json({success:false,message:"Not Authorized! Log In Please"});
    try {
        const decode = jwt.verify(token,JWT_SECRET);
        req.body.userId = decode.id;
        next();
    } catch (error) {
        res.json({success:false,message:"Log In Please"});
    }
}

module.exports = {authMiddleware};