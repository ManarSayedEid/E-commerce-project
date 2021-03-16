var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = express.Router();

const User = require('../models/user');
const auth = require('../middelware/authorization')


// home page => product
router.post('/signup', async (req,res) =>{
    try {
        const { username, password, email, gender } = req.body;
        const hash = await bcrypt.hash(password, 5);
        const user = await User.create({ username, email, gender,  password: hash })

        const token = jwt.sign({ id: user.id }, 'my-signing-secret')
        res.json({ token: token});
        // res.send(user);
    } catch (err) {
        console.log(err)
        // res.send(err);
        res.send({message: 'something went wrong. Please enter valid inputs'});
    }
} );


router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        ///// validation on username too

        const user = await User.findOne({ email }).exec();

        if (!user)
            throw new Error('mail or password is incorrect');

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
        throw new Error('mail or password is incorrect');

        // res.send('You logged in sucessfully :)')
        const token = jwt.sign({ id: user.id }, 'my-signing-secret')
        res.json({ token: token});

    } catch (error) {
        console.log(error)
        // res.send(error);
        res.send({message: 'something went wrong. Please enter valid inputs'});
    }
})

router.get('/profile', auth, async (req, res) => {

        const user = await User.findOne({_id: req.signedData.id}).exec() ;
        res.send(user);

})



















// testing //////////////////////////////
router.delete('/', async (req,res) =>{
    await  User.deleteMany({});
    res.send('deleted sucessfully');
})
////////////////////////////////////////










module.exports = router;