const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const HttpStatus = require('http-status')
const { to, ReE, ReS, isEmpty } = require('../middlewares/errorhandler')
const CONFIG = require("../../config/config")

const authMiddleware = async (req, res, next) => {
    let token
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1]
        try {
            if (token) {
                const decoded = jwt.verify(token,CONFIG.JWT_SECREATE_KEY)
                const user = await User.findById(decoded?.id)
                req.user = user;
                next();
            }
        } catch (error) {
            return ReE(
                res,
                { message: 'Not Authorized token expired, Please Login again' },
                HttpStatus.BAD_REQUEST
            )
        }
    } else {
        return ReE(
            res,
            { message: 'There is no token atteched to header' },
            HttpStatus.BAD_REQUEST
        )
    }
}

const isAdmin = async(req,res,next)=>{
    const { email} =req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role !== "admin"){
        return ReE(
            res,
            { message: 'you are not admin' },
            HttpStatus.BAD_REQUEST
        )
    }else{
        next();
    }
    }
module.exports = { authMiddleware,isAdmin}
