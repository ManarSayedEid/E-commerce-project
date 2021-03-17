const jwt = require('jsonwebtoken');

module.exports = (req,res, next) =>{

    try {
        const { authorization } = req.headers;
        const signedData = jwt.verify( authorization,'my-signing-secret');
        console.log({signedData})
        req.signedData = signedData;
        next();
        
    } catch (error) {
        res.send('Please try sign in again with correct data!');
    }

}