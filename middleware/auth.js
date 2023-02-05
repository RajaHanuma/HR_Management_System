const jwt = require('jsonwebtoken');
require('dotenv').config();
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if(!token){
        return res.status(401).json({message : "A token is required for authorization"});
    }
    try {
        const decode = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decode;
        console.log("in auth js", req.user);
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
    return next();
};

module.exports = verifyToken;