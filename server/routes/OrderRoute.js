const express = require('express');
const {placeOrder,verifyOrder,userOrders} = require('../controllers/OrderController');
const {authMiddleware} = require('../middlewares/auth');

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userorders',authMiddleware,userOrders);

module.exports = {orderRouter};
