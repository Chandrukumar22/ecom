const User = require('../../models/userModel')
const dotenv = require("dotenv").config();
const HttpStatus = require('http-status')
const { to, ReE, ReS, undefined} = require('../../middlewares/errorhandler')

// const createUser = async (req, res) => {
//     const {email,mobile} = req.body
//     // the email validation
//     let findEmail;
//     [err, findEmail] = await to(User.findOne({email:email}));
//     if(err){
//         return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
//     }
//     if(undefined(findEmail)) {
//         return ReE(res, { message : `Request email id is not found`}, HttpStatus.BAD_REQUEST)
//       }
//     if(findEmail){
//         return ReE( res,{ message: 'Request email id is already register' }, HttpStatus.BAD_REQUEST)
//     }
    
//     //mobilenumber validation
//     let findMobileNumber;
//     [err, findMobileNumber] = await to(User.findOne({mobile:mobile}));
//     if(err){
//         return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
//     }
//     if(undefined(findMobileNumber)) {
//         return ReE(res, { message : `Request mobile number is not found`}, HttpStatus.BAD_REQUEST)
//       }
//     if(findMobileNumber){
//         return ReE( res,{ message: 'Request mobile number is already register' }, HttpStatus.BAD_REQUEST)
//     }
//     // user insert
//     let newUser
//         [err, newUser] = await to(User.create(req.body)); 
//         if(err){
//             return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
//         }else{
//             return ReS(res,{ message: 'User created successfully ', user: newUser }, HttpStatus.OK )
//         }
// }

// //login successfully
// const loginUserCntrl = async (req, res) => {
//     const { email, password } = req.body;
//     [err, findUser] = await to(User.findOne({ email: email })); 
//     if(err){
//         return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
//     }
//     if (findUser && (await findUser.isPasswordMatched(password))) {
//         const user = await findUser.tokenGenerate(findUser)
//         return ReS(res,
//             {
//                 message: 'Login Successfully',
//                 user: user
//             }, HttpStatus.OK)
//     } else {
//         return ReE(res,{ message: 'Invalid credentials' },HttpStatus.BAD_REQUEST)
//     }
// }

// Get all user
const getAllUser = async (req, res) => {
    let getUser;
    [err, getUser] = await to(User.find({ active: true })); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Users found successfully', getalluser: getUser }, HttpStatus.OK )
    }
}
// const getAllJoinUser = async (req, res) => {
//     let users;
//     [err, users] = await to(User.find({  active: true  }) .populate('cartId').populate('orderId').populate('productId')); 
//     if(err){
//         return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
//     }else{
//         return ReS(res,{ message: 'Users found Successfully', getalluser: users }, HttpStatus.OK )
//     }
// }

// //Get a single user
// const getSingleUser = async (req, res) => {
//     let { id } = req.params
//     let getUser;
//     [err, getUser] = await to(User.findById({id: id,  active: true })); 
//     if(err){
//         return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
//     }
//     if(isNull(getUser)){
//         return  ReE(res,{message:"Request user id is invaild"} , HttpStatus.INTERNAL_SERVER_ERROR);
//      }else{
//         return ReS(res,{ message: 'User found successfully', getuser: getUser }, HttpStatus.OK )
//     }
// }

// //update the user
// const updateUser = async (req, res) => {
//     const { id } = req.params
//     let updateUser;
//     [err, updateUser] = await to(User.findByIdAndUpdate(id, {role: req?.body?.role,active: true },{new: true})); 
//     if(err){
//         return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
//     }else{
//         return ReS(res,{ message: 'Upgrade the userdetails is successfully', updateuser: updateUser }, HttpStatus.OK )
//     }
// }

// //delete the user
// const deleteUser = async (req, res) => {
//     const { id } = req.params
//     let deleteUser;
//     [err, deleteUser] = await to(User.findByIdAndDelete({id})); 
//     if(err){
//         return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
//     }else{
//         return ReS(res,{ message: 'Remove the userdetails is successfully', deleteuser: deleteUser }, HttpStatus.OK )
//     }
// }

module.exports =   {getAllUser}
    // createUser,
    // getAllJoinUser,
  
    // loginUserCntrl,
    // updateUser,
    // deleteUser,
    // getSingleUser
