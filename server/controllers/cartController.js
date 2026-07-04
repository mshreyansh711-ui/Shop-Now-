const User    = require('../models/User');
const Product = require('../models/Product');

const getPopulatedCart = async (userId) => {
  const user = await User.findById(userId).populate('cart.product');
  return user.cart;
};

// GET /api/cart
const getCart = async (req, res) => {
  try {
    res.json(await getPopulatedCart(req.user._id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/cart   { productId, quantity }
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Not enough stock' });

    const user = await User.findById(req.user._id);
    const item = user.cart.find(i => i.product.toString() === productId);
    if (item) { item.quantity += quantity; } else { user.cart.push({ product: productId, quantity }); }
    await user.save();
    res.json(await getPopulatedCart(req.user._id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/cart/:productId   { quantity }
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cart.find(i => i.product.toString() === req.params.productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });
    if (quantity <= 0) {
      user.cart = user.cart.filter(i => i.product.toString() !== req.params.productId);
    } else {
      item.quantity = quantity;
    }
    await user.save();
    res.json(await getPopulatedCart(req.user._id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/:productId
const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(i => i.product.toString() !== req.params.productId);
    await user.save();
    res.json(await getPopulatedCart(req.user._id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/clear
const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
