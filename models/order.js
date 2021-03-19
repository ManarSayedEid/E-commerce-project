const mongoose = require('mongoose');

const schema = mongoose.Schema({
    shippingAddress: {
        type: String,
         required: true
    },
    isDelivered: {
        type: Boolean,
        // required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            _id: { // product_id 
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            } 
        }
    ] 
})

const Order = mongoose.model('Order', schema);
module.exports = Order;