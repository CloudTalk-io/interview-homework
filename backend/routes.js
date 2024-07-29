const { wrap } = require('async-middleware');

const validateMiddleware = require('./middlewares/validate.middleware');
const productsController = require('./controllers/products.controller');
const shipmentsController = require('./controllers/shipments.controller');
const shipmentsValidator = require('./validators/shipments.validator');

module.exports = function (app) {
  app.route('/products').get(wrap(productsController.getAll));

  app
    .route('/shipments')
    .get(wrap(shipmentsController.getAll))
    .post(
      ...validateMiddleware(shipmentsValidator.create),
      wrap(shipmentsController.create)
    );
  app
    .route('/shipments/:id')
    .get(
      ...validateMiddleware(shipmentsValidator.getOne),
      wrap(shipmentsController.getOne)
    )
    .patch(
      ...validateMiddleware(shipmentsValidator.update),
      wrap(shipmentsController.update)
    );
};
