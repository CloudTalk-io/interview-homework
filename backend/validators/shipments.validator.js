const { body, param } = require('express-validator');
<<<<<<< HEAD
const { ShipmentStatus } = require('../models/shipment.model');
=======
>>>>>>> 57e1bab36f01c7739f916569b299426781ce984d

const companyName = body('companyName').trim().not().isEmpty();

const shipmentDate = body('shipmentDate')
  .optional({ nullable: true })
  .isISO8601();

<<<<<<< HEAD
const status = body('status')
  .optional()
  .isString()
  .isIn(Object.values(ShipmentStatus));

const products = [
  body('products').optional().isArray(),
  body('products.*.product')
    .not()
    .isEmpty()
    .isMongoId()
    .custom(
      (v, { req }) =>
        req.body.products.filter((p) => p.product === v).length === 1
    ),
  body('products.*.quantity').optional().isInt({ min: 1 }),
];

const create = [companyName, shipmentDate, status, ...products];

const getOne = [param('id').not().isEmpty().isMongoId()];

const update = [
  ...getOne,
  companyName.optional(),
  status,
  shipmentDate,
  ...products,
];
=======
const products = [
  body('products').optional().isArray(),
  body('products.*.product').not().isEmpty().isMongoId(),
  body('products.*.quantity').optional().isInt({ min: 1 }),
];

const create = [companyName, shipmentDate, ...products];

const getOne = [param('id').not().isEmpty().isMongoId()];

const update = [...getOne, companyName.optional(), shipmentDate, ...products];
>>>>>>> 57e1bab36f01c7739f916569b299426781ce984d

module.exports = { create, getOne, update };
