const {Food} = require('../models/Food');
const fs = require('fs');

const addFood = async(req,res)=>{
    let image_filename = `${req.file.filename}`;
    try {
        const resp = await Food.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        })
        res.json({success:true,message: "Food Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message: "Food Error"});
    }
}

const listFood = async(req,res)=>{
    try {
        const foods = await Food.find();
        res.json({success:true,data:foods});
    } catch (error) {
        res.json({success:false,message: "Food Error"});
    }
}

const removeFood = async(req,res)=>{
    try {
        const food = await Food.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        const resp1 = await Food.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"});
    } catch (error) {
        res.json({success:false,message: "Food Error"});
    }
}

module.exports = {addFood,listFood,removeFood};