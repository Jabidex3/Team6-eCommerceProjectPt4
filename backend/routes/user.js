const express = require('express');

const userController = require('../controllers/user')
const productController = require('../controllers/product')
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
router.post('/product', productController.addProduct)
router.delete('/product', productController.deleteProduct)
router.put('/product', productController.putProduct)
// router.get('/admin', userController.getAdmin)
module.exports = router;