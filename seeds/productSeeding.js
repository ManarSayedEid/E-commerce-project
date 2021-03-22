const mongoose = require('mongoose');


// 'mongodb+srv://manar:<manar@shoppingcart.n3vuw.mongodb.net/test'

mongoose.connect('mongodb+srv://manar:manar@shoppingcart.n3vuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    || 'mongodb://localhost:27017/shopping',
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log('Failed to connect to MongDB');
            process.exit(1);
        }
        else {
            console.log('Connected successfully to MongDB');
        }
    });

const Product = require('../models/product');

const products =
    [
        new Product(
            {
                imagePath: 'https://cdn.shopify.com/s/files/1/0499/3079/7217/products/XKK-AW21-017-BLACK_2_720x.jpg?v=1608734815',
                title: 'Shoes',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: '50',
                quantity: 100
            }),
        new Product(
            {
                imagePath: 'https://cdn.shopify.com/s/files/1/0499/3079/7217/products/XKK-AW21-018-BLACK_2_720x.jpg?v=1608734826',
                title: 'Shoes',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: '50',
                quantity: 20
            }),
        new Product(
            {
                imagePath: 'https://cdn.shopify.com/s/files/1/0499/3079/7217/products/TEN-AW21-006-BLACK_2_720x.jpg?v=1608041286',
                title: 'Shoes',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: '50',
                quantity: 18
            }),
        new Product(
            {
                imagePath: 'https://cdn.shopify.com/s/files/1/0499/3079/7217/products/GER-AW21-006-BLACK_2_720x.jpg?v=1607957683',
                title: 'Shoes',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: '50',
                quantity: 10
            }),
        new Product(
            {
                imagePath: 'https://cdn.shopify.com/s/files/1/0499/3079/7217/products/PRD-AW21-002-BLACK_2_720x.jpg?v=1607871454',
                title: 'Shoes',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: '50',
                quantity: 6
            })




    ]

//
var done = 0;
for (var i = 0; i < products.length; i++) {
    // products[i].save();
    products[i].save().then(() => {
        done++;
        if (done === products.length) {
            // console.log(products)
            exit();
        }
    })
    //     (err, result) =>{
    //     done++;
    //     if (done === products.length){
    //         console.log(products)
    //         exit();
    //     }
    // }
    // );

}

function exit() {
    mongoose.disconnect();
}


