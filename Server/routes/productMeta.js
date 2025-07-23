const express = require('express')
const router = express.Router()
const ProductMeta = require('../Model/productMeta')
const {getAllProductMeta,addProductMeta, getProductMeta, updateProductMeta, deleteProductMeta} = require('../Controller/productMetaController')
const {authenticateJWT} = require('../Middleware/Authorization')

router.post("/addMeta", authenticateJWT, addProductMeta);
router.get("/productMeta/:productId", getProductMeta);
router.put("/productMeta/:id", authenticateJWT, updateProductMeta);
router.delete("productMeta/:id", authenticateJWT, deleteProductMeta);
router.get("/", authenticateJWT,getAllProductMeta );
module.exports = router;