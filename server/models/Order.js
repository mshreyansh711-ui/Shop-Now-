const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 }
  }],
  totalPrice:    { type: Number, required: true },
  address:       { type: String, required: true },
  phone:         { type: String, required: true },
  paymentMethod: { type: String, enum: ['COD', 'UPI'], default: 'COD' },
  status:        { type: String, enum: ['Pending','Packed','Shipped','Delivered'], default: 'Pending' },
  orderDate:     { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
