const express = require('express');
const authMiddleware = require('../Middleware/userAuth');
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, cancelOrder } = require('../Controller/order');
const { authenticateJWT, authorizeRoles } = require('../Middleware/Authorization');
const router = express.Router()

router.post('/place',authMiddleware,placeOrder)
router.get('/user',authMiddleware,getUserOrders)
router.get('/all',authenticateJWT,authorizeRoles('admin'),getAllOrders)
router.put('/update/:orderId',authenticateJWT,updateOrderStatus)
router.delete('/delete',authMiddleware,cancelOrder)

module.exports = router;