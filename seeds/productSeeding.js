const mongoose = require('mongoose');


// 'mongodb+srv://manar:<manar@shoppingcart.n3vuw.mongodb.net/test'

mongoose.connect('mongodb+srv://manar:manar@shoppingcart.n3vuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' 
|| 'mongodb://localhost:27017/shopping',
 {useNewUrlParser: true, useUnifiedTopology: true} , (err) => {
     if (err){
         console.log('Failed to connect to MongDB');
         process.exit(1);
     }
     else{
        console.log('Connected successfully to MongDB');
     }
 });

const Product = require('../models/product');

const products =
    [
        new Product(
            {
                imagePath: 'https://cdn1.blovcdn.com/bloglovin/aHR0cCUzQSUyRiUyRjQxLm1lZGlhLnR1bWJsci5jb20lMkYwOTNhNWE3ZWFiYzJlZDBkZmQ0MWFhOTY5OThlMDNkOSUyRnR1bWJscl9vNGJqbzMyTTRFMXJzeWFlcG8xXzUwMC5wbmc=?checksum=1e3ad29e03a3a346026c52931b494db98774a19e&format=j',
                title: 'Coat',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: '50'
            }),
        new Product(
            {
                imagePath: 'https://cdn1.blovcdn.com/bloglovin/aHR0cCUzQSUyRiUyRjQxLm1lZGlhLnR1bWJsci5jb20lMkYwOTNhNWE3ZWFiYzJlZDBkZmQ0MWFhOTY5OThlMDNkOSUyRnR1bWJscl9vNGJqbzMyTTRFMXJzeWFlcG8xXzUwMC5wbmc=?checksum=1e3ad29e03a3a346026c52931b494db98774a19e&format=j',
                title: 'Coat',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: '50'
            }),
        new Product(
            {
                imagePath: 'https://cdn1.blovcdn.com/bloglovin/aHR0cCUzQSUyRiUyRjQxLm1lZGlhLnR1bWJsci5jb20lMkYwOTNhNWE3ZWFiYzJlZDBkZmQ0MWFhOTY5OThlMDNkOSUyRnR1bWJscl9vNGJqbzMyTTRFMXJzeWFlcG8xXzUwMC5wbmc=?checksum=1e3ad29e03a3a346026c52931b494db98774a19e&format=j',
                title: 'Coat',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: '50'
            }),
        new Product(
            {
                imagePath: 'https://cdn1.blovcdn.com/bloglovin/aHR0cCUzQSUyRiUyRjQxLm1lZGlhLnR1bWJsci5jb20lMkYwOTNhNWE3ZWFiYzJlZDBkZmQ0MWFhOTY5OThlMDNkOSUyRnR1bWJscl9vNGJqbzMyTTRFMXJzeWFlcG8xXzUwMC5wbmc=?checksum=1e3ad29e03a3a346026c52931b494db98774a19e&format=j',
                title: 'Coat',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: '50'
            })
    ]

    //
    var done = 0;
    for (var i =0 ; i< products.length; i++){
        // products[i].save();
        products[i].save().then(() =>{
             done++;
            if (done === products.length){
                // console.log(products)
                exit();
            }
         } )
        //     (err, result) =>{
        //     done++;
        //     if (done === products.length){
        //         console.log(products)
        //         exit();
        //     }
        // }
        // );

    }

    function exit(){
        mongoose.disconnect();
    }


