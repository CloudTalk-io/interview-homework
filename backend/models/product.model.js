const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Product', ProductSchema);
