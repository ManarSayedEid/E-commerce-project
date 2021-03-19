var express = require('express');

const router = express.Router();

const Product = require('../models/product');

// home page => product
router.get('/', async (req,res) =>{

     const products = await Product.find({});

    res.send(products);
} );


module.exports = router;