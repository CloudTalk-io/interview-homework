// backend/models/product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  unitPrice: Number
});

module.exports = mongoose.model('Product', ProductSchema);
