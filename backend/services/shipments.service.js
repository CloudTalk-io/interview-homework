const logger = require('../utils/logger')('shipments-service');
const Shipment = require('../models/shipment.model');

function fetchAll(userId) {
  return Shipment.find({ createdBy: userId }).populate('products.product');
}

async function create(shipmentDto, userId) {
  logger.info('Create new shipment', { shipmentDto, userId });

  const shipment = await Shipment.create({
    companyName: shipmentDto.companyName,
    shipmentDate: shipmentDto.shipmentDate,
    products: shipmentDto.products || [],
    createdBy: userId,
  });

  return fetchOne(shipment._id, userId);
}

function fetchOne(id, userId) {
  return Shipment.findOne({
    _id: id,
    createdBy: userId,
  }).populate('products.product');
}

async function update(id, shipmentDto, userId) {
  logger.info('Update a shipment', { id, shipmentDto, userId });

  const shipment = await fetchOne(id, userId);

  if (!shipment) {
    return null;
  }

  shipment.companyName = shipmentDto.companyName || shipment.companyName;
  shipment.shipmentDate = shipmentDto.shipmentDate;
  shipment.status = shipmentDto.status || shipment.status;
  shipment.products =
    typeof shipmentDto.products === 'undefined'
      ? shipment.products
      : shipmentDto.products || [];

  await shipment.save();

  return fetchOne(id, userId);
}

module.exports = { fetchAll, create, fetchOne, update };
