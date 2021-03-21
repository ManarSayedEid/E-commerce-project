const express = require('express');
const app = express();

const validator = require('express-validator');

const cors = require('cors');
app.use(cors);

// connect to monoDB
require('./connection');


////////////////////// express seession ----  express messages

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());


// app.get('/', (req,res) =>{
//     res.send('hello from heroku')
// })


// app.use(validator());
// app.set('view engine', 'ejs');
app.use(express.static('public'));


// set routes
// const admin = require('./routes/admin');
// const pages = require('./routes/pages');
const product = require('./routes/product');
const user = require('./routes/user');
const order = require('./routes/order');



//set end points
// app.use('/admin', admin);
app.use('/order', order);
app.use('/home/product', product);
app.use('/user', user);






// app.get('/', (req,res)=>{
//     res.send('<h1>hello</h1>')
// })

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server Listening at port 3000 ')
})