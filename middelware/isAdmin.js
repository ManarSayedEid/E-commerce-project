
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {

    try {
        const user = await User.findOne({ _id: req.signedData.id }).exec();
        if (user.isAdmin)
            next();
    } catch (error) {
        res.status(401);
        res.send("You are not authorized as an admin!")
    }
}