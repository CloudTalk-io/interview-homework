const mongoose = require('mongoose');

module.exports = {
  companyName: 'Google',
  shipmentDate: new Date().toISOString(),
  products: [{ product: new mongoose.Types.ObjectId(), quantity: 10 }],
};
