const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: String, required: true },
  sub: { type: String, required: true },
  icon: { type: String, required: true },
  rating: { type: Number, default: 4.0 },
  reviews: { type: Number, default: 0 },
  category: { type: String, default: 'Fashion' },
  shopAddress: { type: String, default: '123 Fashion Street, New Delhi, India' },
  shopContact: { type: String, default: '+91 98765 43210' }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
