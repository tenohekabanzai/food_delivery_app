const { default: Stripe } = require('stripe');
const {Order} = require('../models/Order');
const {User} = require('../models/User');

const stripe_secret_key = "sk_test_51Moj8NSEJJBiaxTZtWwOdTf8lFeczlBonOjFDka1QX3HFWfRBbkXxS09fVOTBoyN8R1xp9IwgshsMDCmjvUqwnnh006amLH1dI"

const stripe = new Stripe(stripe_secret_key);
const frontend_url = "http://localhost:5173"

const placeOrder = async(req,res)=>{
    try {
        const newOrder = await Order.create({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await User.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1,
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url});
    } catch (error) {
        res.json({success:true,message:"Failed to place Order"});
    }
}

const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body;
    try {
        if(success === "true")
        {
            const resp = await Order.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Payment Verified successfully"}); 
        }
        else
        {
            const resp  =await Order.findByIdAndDelete(orderId);
            res.json({success:false,message:"Payment Failed"});
        }
    } catch (error) {
        res.json({success:false,message:"Error"});
    }
}

const userOrders = async(req,res)=>{
    try {
        const orders = await Order.find({userId:req.body.userId});
        // console.log(orders);
        res.json({success:true,data:orders});
    } catch (error) {
        res.json({success:false,message:"Error"});
    }
}

module.exports = {placeOrder,verifyOrder,userOrders};