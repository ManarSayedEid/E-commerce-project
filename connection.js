const mongoose = require('mongoose');


// 'mongodb+srv://manar:<manar@shoppingcart.n3vuw.mongodb.net/test'

mongoose.connect('mongodb+srv://manar:manar@shoppingcart.n3vuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
 || 'mongodb://localhost:27017/test',
 {useNewUrlParser: true, useUnifiedTopology: true} , (err) => {
     if (err){
         console.log('Failed to connect to MongDB');
         process.exit(1);
     }
     else{
        console.log('Connected successfully to MongDB');
     }
 });
