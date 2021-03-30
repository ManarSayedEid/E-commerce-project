var express = require("express");

const router = express.Router();
const path = require("path")

const Product = require("../models/product");

const auth = require("../middelware/authorization");
const isAdmin = require("../middelware/isAdmin");

// image uploads

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });



/// get cateogry
router.get("/bags", async (req, res) => {
  const products = await Product.find({ category: "bags" }).exec();

  res.json(products);
});

router.get("/shoes", async (req, res) => {
  const products = await Product.find({ category: "shoes" }).exec();

  res.json(products);
});

router.get("/accessories", async (req, res) => {
  const products = await Product.find({ category: "accessories" }).exec();

  res.json(products);
});

// seeding the product page
router.get("/", async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// click on product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        error: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/// admin parts  create && update && delete

router.post(
  "/",
  upload.single("imagePath"),
  auth,
  isAdmin,
  async (req, res) => {
    try {
      console.log(req.file);
      const { price, title, description, quantity, category } = req.body;
      const product = await Product.create({
        price,
        title,
        description,
        quantity,
        category,
      });

      res.status(201).json({
        product: product,
      });
    } catch (err) {
      res.json({
        error: err.message,
      });
    }
  }
);

// update product

router.patch("/:id", auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        error: "Product not found",
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
      product: updatedProduct,
    });
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
});

//////////////////////////////////////////////////////////////////////////

module.exports = router;
