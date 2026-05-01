const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: String, required: true },
  sub: { type: String, required: true },
  icon: { type: String, required: true },
  rating: { type: Number, default: 4.0 },
  reviews: { type: Number, default: 0 },
  category: { type: String, default: 'Fashion' }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
