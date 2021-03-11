const express = require('express');
const app = express();



// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())


// app.set('view engine', 'ejs');
// app.use(express.static('public'));



// connect to monoDB
require('./connection');

// set routes
const Admin = require('./routes/admin');


//middelware
app.use('/admin', Admin);












// app.get('/', (req,res)=>{
//     res.send('<h1>hello</h1>')
// })

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server Listening at port 3000 ')
})