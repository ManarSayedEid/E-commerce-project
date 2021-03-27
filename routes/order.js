var express = require('express');
const router = express.Router();

const Order = require('../models/order');
const User = require('../models/user');
const auth = require('../middelware/authorization');
const isAdmin = require('../middelware/isAdmin');



// make orders
router.post("/", auth, async(req, res) => {
    // let {cartItems} = req.body;
    try {
        const user = await User.findOne({ _id: req.signedData.id }).exec();

        if (!user) {
            res.status(404);
            throw new Error("User doesn't exist");
        }

        const { shippingAddress, paymentMethod, cartItems } = req.body;
 

        if (cartItems.length === 0) {
            throw new Error("No items to order!")
        }

        const createdOrder = await Order.create({
            shippingAddress, paymentMethod, cartItems, user: user._id,
        })

        res.status(201).json({
            order: createdOrder
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})


// get all orders
router.get("/", auth, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('cartItems.productId');
        res.status(200).json({ orders: orders });

    } catch (err) {
        res.json({ error: err.message });
    }
})


// get order of logged user
router.get("/myorders", auth, async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.signedData.id }).exec();
        const myorders = await Order.find({ user: user._id });

        if (!myorders) {
            throw new Error("You don't have any orders");
        }

        res.status(200).json({ orders: myorders });
    } catch (err) {
        res.json({ error: err.message });
    }
})


router.patch("/:id/delivered", auth , isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        order.isDelivered = true;
        order.deliveredAt = Date.now();
        
        const updatedOder = await order.save();

        res.status(200).json({ order: updatedOder });
    } catch (err) {
        res.json({ error: err.message });
    }
})


module.exports = router;