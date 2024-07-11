const  mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true,
    },
    items:{
        type:Array,
        required: true,
    },
    amount:{
        type:Number,
        required: true,
    },
    address:{
        type:Object,
        required:true,
    },
    status:{
        type:String,
        required: true,
        default:"Food being Prepared",
    },
    date:{
        type: Date,
        default: Date.now(),
    },
    payment:{
        type:Boolean,
        default:false,
    }
});

const Order = mongoose.model("Order",OrderSchema);
module.exports = {Order};