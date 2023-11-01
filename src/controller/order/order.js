const Order = require('../../models/ordermodel')
const HttpStatus = require('http-status')
const { to, ReE, ReS, undefined,isNull} = require('../../middlewares/errorhandler')

module.exports.createorder = async (req, res) => {
    const orderId = req.body.orderId
    // the orderId validation
    let findOrder;
    [err, findOrder] = await to(Order.findOne({orderId:orderId}));
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(undefined(findOrder)) {
        return ReE(res, { message : `Request orderId is not found`}, HttpStatus.BAD_REQUEST)
      }
    if(findOrder){
        return ReE( res,{ message: 'Request orderId is already register' }, HttpStatus.BAD_REQUEST)
    }
  //order insert
  let newOrder;
  [err, newOrder] = await to(Order.create(req.body)); 
  if(err){
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
  }else{
      return ReS(res,{ message: 'Cart found successfully', order: newOrder }, HttpStatus.OK )
  }
}
// Get all order
module.exports.getAllOrder = async (req, res) => {
    let getAllOrder;
    [err, getAllOrder] = await to(Order.find({active:true})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Orders found successfully', getAllOrder: getAllOrder }, HttpStatus.OK )
    }
}

//Get a single order

module.exports.getSingleOrder = async (req, res) => {
    let { id } = req.params
    let getOrder;
    [err, getOrder] = await to(Order.findById(id)); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(isNull(getOrder)){
        return  ReE(res,{message:"Request orderid is not found"} , HttpStatus.INTERNAL_SERVER_ERROR);
     }else{
        return ReS(res,{ message: 'Order  found successfully', getorder: getOrder }, HttpStatus.OK )
    }
}

//update the order
module.exports.updateOrder = async (req, res) => {
    const { id } = req.params
    let updateOrder;
    [err, updateOrder] = await to(Order.findByIdAndUpdate(id, {orderStatus: req?.body?.orderStatus },{new: true})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Upgrade the order details is successfully', updateorder: updateOrder }, HttpStatus.OK )
    }
}

//delete the order
module.exports.deleteOrder = async (req, res) => {
    const { id } = req.params
    let deleteOrder;
    [err, deleteOrder] = await to(Order.findByIdAndDelete({id})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Remove order details is successfully', deleteorder: deleteOrder }, HttpStatus.OK )
    }
}

