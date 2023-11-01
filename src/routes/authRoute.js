const express = require("express");
const router  = express.Router();
const usercntrl = require("../controller/user/usercntrl")
const productcntrl = require("../controller/product/product")
const Ordercntrl = require("../controller/order/order")
const cartcntrl = require("../controller/cart/cart")
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");



//user values
// router.post("/register",usercntrl.createUser)
// router.post("/login",usercntrl.loginUserCntrl)
// router.get("/alluser",usercntrl.getAllJoinUser)
// router.get("/all/user",usercntrl.getAllUser)
// router.get("/:id",authMiddleware,isAdmin,usercntrl.getSingleUser)
// router.delete("/:id",usercntrl.deleteUser)
// router.put("/:id",usercntrl.updateUser)

// //product values
// router.post("/create/product",productcntrl.createProduct)
// router.get("/all/product/:productId",productcntrl.getAllProducts)
// router.get("/product/:id",productcntrl.getSingleProduct)
// router.put("/product/:id",productcntrl.updateProduct)
// router.delete("/product/:id",productcntrl.deleteProduct)

//cart values
router.post("/create/cart",cartcntrl.createCart)
router.get("/all/cart",cartcntrl.getAllCarts)
router.get("/cart/:id",cartcntrl.getSingleCart)
router.put("/cart/:id",cartcntrl.updateCart)
router.delete("/cart/:id",cartcntrl.deleteCart)

//order values
router.post("/create/order",Ordercntrl.createorder)
router.get("/all/order",Ordercntrl.getAllOrder)
router.get("/order/:id",Ordercntrl.getSingleOrder)
router.put("/order/:id",Ordercntrl.updateOrder)
router.delete("/order/:id",Ordercntrl.deleteOrder)


module.exports = router;