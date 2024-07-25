const { body, param } = require('express-validator');

const companyName = body('companyName').trim().not().isEmpty();

const shipmentDate = body('shipmentDate')
  .optional({ nullable: true })
  .isISO8601();

const products = [
  body('products').optional().isArray(),
  body('products.*.product').not().isEmpty().isMongoId(),
  body('products.*.quantity').optional().isInt({ min: 1 }),
];

const create = [companyName, shipmentDate, ...products];

const getOne = [param('id').not().isEmpty().isMongoId()];

const update = [...getOne, companyName.optional(), shipmentDate, ...products];

module.exports = { create, getOne, update };
