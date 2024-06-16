// backend/database/models/shipment.js
const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  companyName: String,
  shipmentId: String,
  creationDate: { type: Date, default: Date.now },
  scheduledShipmentDate: Date,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  status: { type: String, enum: ['Created', 'Prepared', 'Shipped'], default: 'Created' }
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
