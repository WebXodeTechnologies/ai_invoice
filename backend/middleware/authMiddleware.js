const jwt = require(jsonwebtoken); 
const User = require("../models/User");

const protect = async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            token = req.headers.authorization.split(" ")[1];

            // verify Token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            // Get user from Token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch(error){
            return res.status(401).json({message:'Not Authorized. token Failed'})
        }
    }

    if(!token) {
        return res.status(401).json({message:"Not authorized, no token"});
    }
};

module.exports = { protect }