const express = require('express');

const userController = require('../controllers/user')
const productController = require('../controllers/product')
const cartController = require('../controllers/cart')
const router = express.Router();

// User routes
router.get('/all', userController.getAllUsers)
router.post('/register', userController.registerUser)
//router.get('/login', userController.loginUser)
router.get('/login/:email/:password', userController.loginUser)
router.get('/user', userController.getUser)
router.put('/user', userController.putUser)
router.put('/user/picture', userController.putPicture)
router.delete('/user/:id', userController.deleteUser)
// Product routes
router.get('/user/shop', productController.getAllProducts)
router.get('/user/shop/:pid', productController.getProduct)
router.get('/user/shop/cart/:pid', productController.getProductForCart)
router.post('/product', productController.addProduct)
router.delete('/product/:pid', productController.deleteProduct)
router.put('/product', productController.putProduct)
//Cart routes
router.get('/user/cart/:id', cartController.getCart)
router.post('/user/cart', cartController.addToCart)
router.delete('/user/cart/:cid', cartController.deleteCartItem)
router.delete('/user/cart/clear/:id', cartController.deleteAllCartItems)
router.get('/user/cart/items/:id', cartController.numItem)
router.get('/user/cart/price/:id', cartController.totalPrice)
// router.get('/admin', userController.getAdmin)
module.exports = router;