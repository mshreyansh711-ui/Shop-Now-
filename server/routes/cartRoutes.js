const express = require('express');
const router  = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.get('/',              protect, getCart);
router.post('/',             protect, addToCart);
router.put('/:productId',   protect, updateCartItem);
router.delete('/clear',     protect, clearCart);       // must be before /:productId
router.delete('/:productId', protect, removeFromCart);

module.exports = router;
