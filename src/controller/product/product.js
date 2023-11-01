const Product = require('../../models/productmodule')
const HttpStatus = require('http-status')
const { to, ReE, ReS,undefined,isNull} = require('../../middlewares/errorhandler')

const createProduct = async (req, res) => {
    const productId = req.body.productId
       // the productId validation
       let findProduct;
       [err, findProduct] = await to(Product.findOne({productId:productId}));
       if(err){
           return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
       }
       if(undefined(findProduct)) {
        return  ReE(res,{message:"Request product id is invaild"} , HttpStatus.INTERNAL_SERVER_ERROR);
         }
       if(findProduct){
           return ReE( res,{ message: 'Request productId is already register' }, HttpStatus.BAD_REQUEST)
       }
     //product insert
     let newProduct;
     [err, newProduct] = await to(Product.create(req.body)); 
     if(err){
         return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
     }else{
         return ReS(res,{ message: 'Product is created successfully', product: newProduct }, HttpStatus.OK )
     }
}

// Get all user
const getAllProducts = async (req, res) => {
    const q = req.params.productId;
    console.log('path',q);
    let getProduct;
    [err, getProduct] = await to(Product.find({active:true,productId:q})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Products found successfully', getallproduct: getProduct }, HttpStatus.OK )
    }
}
// get a single user
const getSingleProduct = async (req, res) => {
    let { id } = req.params
    let getProduct;
    [err, getProduct] = await to(Product.findById(id)); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(isNull(getProduct)){
       return  ReE(res,{message:"Request product id is invaild"} , HttpStatus.INTERNAL_SERVER_ERROR);
    }else{
       return ReS(res,{ message: 'product found succssfully', getuser: getProduct }, HttpStatus.OK );
    } 
}

//update the product
const updateProduct = async (req, res) => {
    const { id } = req.params
    let updateProduct;
    [err, updateProduct] = await to(Product.findByIdAndUpdate(id, {brand: req?.body?.brand },{new: true})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Upgrade the Product details is successfully', updateproduct: updateProduct }, HttpStatus.OK )
    }
}

//delete the product
const deleteProduct = async (req, res) => {
    const { id } = req.params
    let deleteProduct;
    [err, deleteProduct] = await to(Product.findByIdAndDelete({id})); 
    if(err){
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }else{
        return ReS(res,{ message: 'Remove the product details is successfuly', deleteProduct: deleteProduct }, HttpStatus.OK )
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
}
