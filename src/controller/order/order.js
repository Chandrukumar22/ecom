const {Order} = require('../../models/ordermodel')
const HttpStatus = require('http-status')
const { to, ReE, ReS,isNull, isEmpty} = require('../../middlewares/errorhandler')
const { isObjectIdOrHexString } = require('mongoose')

module.exports.createorder = async (req, res) => {
    const {orderId,orderStatus} = req.body
    
    //request body to validat the value
    if(isNull(orderId)){
        return ReE( res,{ message: 'please enter a valid orderId' }, HttpStatus.BAD_REQUEST)
    }
    
    var statusType = ['booked','inprogress','complete']
    statusType.forEach((i)=>{
      if(isNull && !statusType.includes(i)){
        return ReE( res,{ message: 'Request order status type is invaild' }, HttpStatus.BAD_REQUEST)
      }
    })

    // the orderId validation
    let findOrder;
    [err, findOrder] = await to(Order.find({orderId:orderId,active:true}));
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(!isEmpty(findOrder)){
        return ReE( res,{ message: 'Request orderId is already register' }, HttpStatus.BAD_REQUEST)
    }
  //order insert
  let newOrder;

  const NewOrder = new Order({orderId:orderId,orderStatus:orderStatus})
  
  [err, newOrder] = await to(NewOrder.save()); 
  if(err){
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
  }
  if(isNull(newOrder)){
    return ReE( res,{ message: 'Cannot create a new order' }, HttpStatus.BAD_REQUEST)
  }
  if(!isNull(newOrder)){
      return ReS(res,{ message: 'order created successfully', order: newOrder }, HttpStatus.OK )
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
    const { id } = req.params;
    const{orderId,orderStatus} = req.body;
    if(!isObjectIdOrHexString(id)){
        return ReE(res,{message:"select a vaild id"}, HttpStatus.INTERNAL_SERVER_ERROR) 
    }
    
    var statusType = ['booked','inprogress','complete']
    statusType.forEach((i)=>{
      if(isNull && !statusType.includes(i)){
        return ReE( res,{ message: 'Request order status type is invaild' }, HttpStatus.BAD_REQUEST)
      }
    })

    
    let existingOrder;
    [err, existingOrder] = await to(Order.findOne({_id:id,active:true})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(isNull(existingOrder)){
        return ReE(res,{message:"order doesnot exists"}, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    let updateOrder;
    [err, updateOrder] = await to(Order.updateOne({_id:id},{$set:{orderId:orderId,orderStatus:orderStatus,active:true}})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(updateOrder.modifiedCount == 0){
        return ReE(res,{message:"order cannot update"}, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(updateOrder.modifiedCount > 0)
    {
        return ReS(res,{ message: 'Upgrade the order details is successfully', updateorder: updateOrder }, HttpStatus.OK )
    }
}

//delete the order
module.exports.deleteOrder = async (req, res) => {
    const { id } = req.params
    
    if(!isObjectIdOrHexString(id)){
        return ReE(res,{message:"select a vaild id"}, HttpStatus.INTERNAL_SERVER_ERROR) 
    }

    let existingOrder;
    [err, existingOrder] = await to(Order.findOne({_id:id,active:true})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(isNull(existingOrder)){
        return ReE(res,{message:"order doesnot exists"}, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    // delete the element
    let deleteOrder;
    [err, deleteOrder] = await to(Order.updateOne({_id:id},{$set:{active:false}})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(deleteOrder.modifiedCount == 0){
        return ReE(res,{message:"order cannot delete"}, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(deleteOrder.modifiedCount > 0)
    {
        return ReS(res,{ message: 'Remove order details is successfully'}, HttpStatus.OK )
    }
}

