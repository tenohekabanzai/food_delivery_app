const express = require('express');
const {addToCart,removeFromCart,fetchCart} = require('../controllers/CartController');
const {authMiddleware} = require('../middlewares/auth');

const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.post('/remove',authMiddleware,removeFromCart);
cartRouter.get('/get',authMiddleware,fetchCart);

module.exports = {cartRouter};