const productsController = require('./controllers/products.controller');

module.exports = function (app) {
  app.get('/products', productsController.getAll);
};
