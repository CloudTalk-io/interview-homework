const { faker } = require('@faker-js/faker');
const Product = require('../models/product.model');
const logger = require('../utils/logger')('mock-data:products');

module.exports = function () {
  logger.debug('Insert products mock data');

  return Product.insertMany(
    Array(10)
      .fill(null)
      .map(() => ({
        imageUrl: faker.image.urlLoremFlickr({
          category: 'cats',
          width: 50,
          height: 50,
        }),
        name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
        description: faker.commerce.productDescription(),
        quantity: faker.number.int({ min: 1, max: 100 }),
        unitPrice: faker.commerce.price({ min: 10, max: 100 }),
      }))
  );
};
