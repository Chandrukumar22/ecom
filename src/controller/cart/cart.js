const Cart = require('../../models/cartmodel')
const HttpStatus = require('http-status')
const { to, ReE, ReS, isNull,undefined } = require('../../middlewares/errorhandler')

const createCart = async (req, res) => {
    const cartId = req.body.cartId
    // the cartId validation
    let findCart;
    [err, findCart] = await to(Cart.findOne({cartId:cartId}));
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(undefined(findCart)) {
        return ReE(res, { message : `Request cartid is not found`}, HttpStatus.BAD_REQUEST)
      }
    if(findCart){
        return ReE( res,{ message: 'Request cartid is already register' }, HttpStatus.BAD_REQUEST)
    }
  //cart insert
  let newCart;
  [err, newCart] = await to(Cart.create(req.body)); 
  if(err){
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
  }else{
      return ReS(res,{ message: 'Cart created successfully', cart: newCart }, HttpStatus.OK )
  }
}

// Get all user
const getAllCarts = async (req, res) => {
    let getAllCarts;
    [err, getAllCarts] = await to(Cart.find({active:true})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Carts found successfully', getAllCart: getAllCarts }, HttpStatus.OK )
    }
}

//Get a single user

const getSingleCart = async (req, res) => {
    let { id } = req.params
    let getCart;
    [err, getCart] = await to(Cart.findById({id:id,active:true})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }     
    if(isNull(getOrder)){
        return  ReE(res,{message:"Request cart id is invaild"} , HttpStatus.INTERNAL_SERVER_ERROR);
     }else{
        return ReS(res,{ message: 'Cart found successfully', getcart: getCart }, HttpStatus.OK )
    }
}

//update the cart
const updateCart = async (req, res) => {
    const { id } = req.params
    let updateCart;
    [err, updateCart] = await to(Cart.findByIdAndUpdate(id, {address1: req?.body?.address1 },{new: true})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Upgrade the cart details is successfully', updateCart: updateCart }, HttpStatus.OK )
    }
}

//delete the cart
const deleteCart = async (req, res) => {
    const { id } = req.params
    let deleteCart;
    [err, deleteCart] = await to(Cart.findByIdAndDelete({id})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Remove the cart details is successfully', deletecart: deleteCart }, HttpStatus.OK )
    }
}
module.exports = {
    createCart,
    getAllCarts,
    getSingleCart,
    updateCart,
    deleteCart,
}
