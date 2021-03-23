var express = require('express');

const router = express.Router();

const Product = require('../models/product');

const auth = require('../middelware/authorization');
const isAdmin = require('../middelware/isAdmin');



// seeding the product page
router.get('/', async (req,res) =>{

     const products = await Product.find({});

    res.json(products);
} );


// click on product
router.get("/:id", async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({
                error: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

/// admin parts  create && update && delete

router.post("/", auth, isAdmin, async(req, res) => {
    try {
        const { price, title, imagePath, description, quantity } = req.body;
        const product = await Product.create({ price, title, imagePath, description, quantity
        });

        

        res.status(201).json({
            product: product
        });

    } catch (err) {
        res.json({
            error: err.message
        })
    }
})

// update product

router.patch("/:id", auth, isAdmin, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({
                error: "Product not found"
            });
        }

        const { title, imagePath, description, price, quantity } = req.body;

        product.title = title;
        product.imagePath = imagePath;
        product.description = description;
        product.price = price;
        product.quantity = quantity;

        const updatedProduct = await product.save();

        res.status(200).json({
            product: updatedProduct
        });

    } catch (err) {
        res.json({
            error: err.message
        });
    }
})

router.get('/bags', async (req,res) =>{

    const products = await Product.find({category: 'bags' }).exec();

   res.json(products);
} );

router.get('/shoes', async (req,res) =>{

    const products = await Product.find({}, {category: shoes }).exec();

   res.json(products);
} );

router.get('/accessories', async (req,res) =>{

    const products = await Product.find({category: accessories }).exec();

   res.json(products);
} );






module.exports = router;