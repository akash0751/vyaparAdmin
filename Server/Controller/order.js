const Order = require("../Model/order");
const Cart = require("../Model/cart");
const Address = require("../Model/Address");
// Place an order
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod ,addressId,deliveryDays = 5} = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    const totalPrice = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

    const newOrder = new Order({
      user: userId,
      items: cart.items,
      totalPrice,
      paymentMethod,
      deliveryDate,
      address
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({path:"user",select:"-password"}).populate("items.product").populate("address")
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const {status} = req.body;
    const {orderId} = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Cancel order (User)
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params; // Get orderId from URL params
        const userId = req.user.id;
    
        const order = await Order.findOne({ _id: orderId, user: userId });
        if (!order) return res.status(404).json({ message: "Order not found" });
    
        if (order.status !== "Pending") {
          return res.status(400).json({ message: "Cannot cancel processed order" });
        }
    
        order.status = "Cancelled";
        await order.save();
    
        res.status(200).json({ message: "Order cancelled successfully", order });
      } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
      }
    };

module.exports = {placeOrder,getAllOrders,getUserOrders,updateOrderStatus,cancelOrder}