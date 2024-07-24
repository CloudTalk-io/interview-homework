require('dotenv').config();

const mongodb = require('../mongodb');
const insertProducts = require('./products');

(async () => {
  await mongodb.connect();

  await Promise.all([insertProducts()]);

  await mongodb.disconnect();
})();
