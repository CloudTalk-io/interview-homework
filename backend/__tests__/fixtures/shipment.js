const productFixture = require('./product');

module.exports = {
  companyName: 'Google',
  shipmentDate: new Date(),
  products: [productFixture],
  createdBy: 'user-id',
};
