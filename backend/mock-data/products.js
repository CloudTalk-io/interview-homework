const Product = require('../models/product.model');
const logger = require('../utils/logger')('mock-data:products');

module.exports = function () {
  logger.debug('Insert products mock data');

  return Product.insertMany(
    Array(10).fill({
      imageUrl: '/assets/logo_black.svg',
      name: 'CloudTalk logo sticker',
      description:
        'High-quality sticker of the best cloud calling solution provider in  the world',
      quantity: 100,
      unitPrice: 10,
    })
  );
};
