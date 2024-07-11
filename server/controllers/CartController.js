const {User} = require('../models/User');

const addToCart = async(req,res)=>{
    try {
        let userData = await User.findById(req.body.userId);
        
        let cartData = userData.cartData;
        
        if(!cartData[req.body.itemId])
        cartData[req.body.itemId] =1;
        else
        cartData[req.body.itemId] +=1;

        const resp  = await User.findByIdAndUpdate(req.body.userId,{cartData:cartData});
        if(resp)
        res.json({success:true,message:"Added Item to Cart"});
    } catch (error) {
        res.json({success:false,message:"Unable to Add Item"});
    }
}

const removeFromCart = async(req,res)=>{
    try {
        let userData = await User.findById(req.body.userId);
        
        let cartData = userData.cartData;
        
        if(cartData[req.body.itemId]>0)
        cartData[req.body.itemId] -=1;

        const resp  = await User.findByIdAndUpdate(req.body.userId,{cartData:cartData});
        if(resp)
        res.json({success:true,message:"Removed Item from Cart"});
    } catch (error) {
        res.json({success:false,message:"Unable to Remove Item"});
    }
}

const fetchCart = async(req,res)=>{
    try {
        let userData = await User.findById(req.body.userId);        
        let cartData = userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        res.json({success:false,message:"Unable to Fetch Item"});
    }
}

module.exports = {addToCart,removeFromCart,fetchCart};