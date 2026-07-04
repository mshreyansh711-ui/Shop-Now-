const Order   = require('../models/Order');
const User    = require('../models/User');
const Product = require('../models/Product');

// POST /api/orders
const placeOrder = async (req, res) => {
  try {
    const { address, phone, paymentMethod } = req.body;
    if (!address || !phone) return res.status(400).json({ message: 'Address and phone are required' });

    const user = await User.findById(req.user._id).populate('cart.product');
    if (!user.cart || user.cart.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    let totalPrice = 0;
    const orderProducts = [];

    for (const item of user.cart) {
      const product = await Product.findById(item.product._id);
      if (!product) return res.status(404).json({ message: `Product not found` });
      if (product.stock < item.quantity)
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });

      totalPrice += product.price * item.quantity;
      orderProducts.push({ product: product._id, quantity: item.quantity });
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalPrice,
      address,
      phone,
      paymentMethod: paymentMethod || 'COD'
    });

    user.cart = [];
    await user.save();

    const populated = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('products.product');

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('products.product')
      .sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('products.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getUserOrders, getOrderById };
