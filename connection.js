const mongoose = require('mongoose');

// process.env.MONGODB_URL || 'mongodb+srv://manar:manar@shoppingcart.n3vuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' 
// || 
mongoose.connect( process.env.MONGODB_URL || 'mongodb+srv://manar:manar@shoppingcart.n3vuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' 
 ||'mongodb://localhost:27017/shopping',
 {useNewUrlParser: true, useUnifiedTopology: true} , (err) => {
     if (err){
         console.log('Failed to connect to MongDB');
         process.exit(1);
     }
     else{
        console.log('Connected successfully to MongDB');
     }
 });

//  mongodb+srv://manar:manar@shoppingcart.n3vuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority