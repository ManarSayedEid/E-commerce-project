const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    image:{
        data: Buffer,
        contentType: String
    },
    isAdmin: {
        type: Boolean,
        // required: true,
        default: false
    }
})

const User = mongoose.model('User', schema);
module.exports = User;