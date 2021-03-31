var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = express.Router();

const User = require('../models/user');
const auth = require('../middelware/authorization');
const isAdmin = require('../middelware/isAdmin');



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



// sign up new users
router.post('/signup', async (req, res) => {
    try {
        const { username, password, email, gender, isAdmin } = req.body;
        const is_taken = await User.findOne({ email });
        if (is_taken) {
            throw new Error("Email has been taken.")
        }
        const hash = await bcrypt.hash(password, 5);
        const user = await User.create({ isAdmin, username, email, gender, password: hash })

        const token = jwt.sign({ id: user.id }, 'my-signing-secret')
        // res.json({ token: token , user});

        res.json({
            user: {
                _id: user.id,
                username: user.username,
                email: user.email,
                gender: user.gender,
                isAdmin: user.isAdmin,
                token: token
            }
        })
    } catch (err) {
        console.log(err)
        res.json({ message: err.message });
    }
});


// login registered users
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        ///// validation on username too

        const user = await User.findOne({ email }).exec();

        if (!user)
            throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            throw new Error('Password is incorrect');

        // res.send('You logged in sucessfully :)')
        const token = await jwt.sign({ id: user.id }, 'my-signing-secret')
        // res.json({ token: token, user});

        res.json({
            user: {
                _id: user.id,
                username: user.username,
                email: user.email,
                gender: user.gender,
                isAdmin: user.isAdmin,
                token: token
            }
        })

    } catch (err) {
        // console.log(error)
        // res.send(error);
        res.send({ message: err.message });
    }
})

// get profile of authorized users
router.get('/profile', auth, async (req, res) => {

    const user = await User.findOne({ _id: req.signedData.id }).exec();
    res.json({
        user: {
            _id: user.id,
            username: user.username,
            email: user.email,
            gender: user.gender,
            isAdmin: user.isAdmin,
        }
    })
})

// update user profile
router.patch("/profile", upload.single("image"), auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.signedData.id }).exec();

        if (!user) {
            res.status(404);
            throw new Error("User doesn't exist");
        }

        const { username, email, password } = req.body;
        // user.username = username || user.username;
        // user.email = email || user.email;

        if (username)
            user.username = username;

        if (email) {
            // const is_taken = await User.findOne({ email });
            if (await User.findOne({ email })) {
                throw new Error("Email has been taken.")
            }
            else
                user.email = email;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 5);
        }

        const updatedUser = await user.save();
        // const token = await updatedUser.generateAuthToken();

        res.json({
            user: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                idAdmin: updatedUser.isAdmin,
                gender: updatedUser.gender
                // token: token
            }
        });
    } catch (err) {
        res.json({
            error: err.message
        })
    }
})

/////////////////////////////////////////////////////////////

// ADMIN PARTS

// get all users
router.get("/", auth, isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }).exec();
        res.status(200).json({ users: users })
    } catch (err) {
        res.json({ error: err.message })
    }
});


// get a user by id
router.get("/:id", auth, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).exec();

        if (!user) {
            res.status(404);
            throw new Error("User not found!");
        }

        res.status(200).json({ user: user });
    } catch (err) {
        res.json({ message: err.message })
    }
})


// // update a user
router.patch("/:id", auth, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);
            throw new Error("User doesn't exist");
        }

        const { username, email, isAdmin } = req.body;

        if (username)
            user.username = username;

        if (email) {
            if (await User.findOne({ email })) {
                throw new Error("Email has been taken.")
            }
            else
                user.email = email;
        }

        
        if (isAdmin)
            user.isAdmin= isAdmin;

      


        const updatedUser = await user.save();

        res.json({
            user: {
                _id: updatedUser._id,
                name: updatedUser.username,
                email: updatedUser.email,
                idAdmin: updatedUser.isAdmin,
            }
        });
    } catch (err) {
        res.json({
            error: err.message
        })
    }
})


// delete a user by id
router.delete("/:id", auth, isAdmin, async (req, res) => {
    try {

        const user = await User.findById(req.params.id).exec();

        if (!user) {
            res.status(404);
            throw new Error("User doesn't exist");
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        res.json({ deletedUser: deletedUser });

    } catch (err) {
        res.json({ error: err.message });
    }
})



















// testing //////////////////////////////
// router.delete('/', auth, isAdmin, async (req, res) => {
//     await User.deleteMany({});
//     res.send('deleted sucessfully');
// })
////////////////////////////////////////










module.exports = router;