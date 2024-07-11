const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const {foodRouter} = require('./routes/FoodRoute');
const {userRouter} = require('./routes/UserRoute');
const {cartRouter} = require('./routes/CartRoute');
const {orderRouter} = require('./routes/OrderRoute');
const App = express();
App.use(express.json());
App.use(cors());
App.use(express.urlencoded({extended:false}));

// db connection
mongoose.connect("mongodb+srv://10ohekabanzai:f22pakfaamcA@cluster0.0kzn85k.mongodb.net/").then(()=>console.log('DB connected'))

// api end points
App.use('/api/food',foodRouter);
App.use('/api/user',userRouter);
App.use('/api/cart',cartRouter);
App.use('/api/order',orderRouter);
App.use('/images',express.static('uploads'));

App.listen(5000,()=>{
    console.log('App running at port 5000');
})
