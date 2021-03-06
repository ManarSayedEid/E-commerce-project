const mongoose = require('mongoose');

const schema = mongoose.Schema({
    shippingAddress: {
        type: String,
        //  required: true,
        default: 'Egypt'
    },
    paymentMethod: {
        type: String,
        default: 'Cash'
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
            productId : { // product_id 
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        }
    ]
})

const Order = mongoose.model('Order', schema);
module.exports = Order;