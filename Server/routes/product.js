const express = require('express');
const {authenticateJWT,authorizeRoles} = require('../Middleware/Authorization')
const {uploadFiles} = require('../Middleware/ImageAuth');
const { AddProduct, GetProduct, GetProductById, UpdateProduct, DeleteProduct } = require('../Controller/product');


const router = express.Router()

router.post('/addProduct', authenticateJWT,authorizeRoles('admin'), uploadFiles, AddProduct);

router.get('/products',GetProduct)
router.get('/product/:id',GetProductById)
router.put('/updateProduct/:id',authenticateJWT,authorizeRoles('admin'),uploadFiles,UpdateProduct)
router.delete('/deleteProduct/:id',authenticateJWT,authorizeRoles('admin'),DeleteProduct)
module.exports = router;