const express = require("express");

const router = express.Router();


router.get('/', (req,res) =>{
    res.send('hello pages')
})

module.exports = router;
