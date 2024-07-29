require('dotenv').config();

const mongodb = require('../mongodb');
const insertProducts = require('./products');

(async () => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  await mongodb.connect();

  await Promise.all([insertProducts()]);

  await mongodb.disconnect();
})();
