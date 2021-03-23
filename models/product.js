const mongoose = require('mongoose');

const schema = mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: [true, "a product must hava a main category"],
        enum: ["shoes", "bags", "accessories"],
    }
})

const Product = mongoose.model('Product', schema);
module.exports = Product;