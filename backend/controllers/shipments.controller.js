const { NotFound } = require('http-errors');

const shipmentsService = require('../services/shipments.service');
const { MongooseError } = require('mongoose');

async function getAll(req, res) {
  return res.json(await shipmentsService.fetchAll(req.session.userId));
}

async function create(req, res) {
  try {
    return res.json(
      await shipmentsService.create(req.body, req.session.userId)
    );
  } catch (err) {
    checkProductValidation(err);
    throw err;
  }
}

async function getOne(req, res) {
  const shipment = await shipmentsService.fetchOne(
    req.params.id,
    req.session.userId
  );

  if (!shipment) {
    throw new NotFound('Shipment not found');
  }

  return res.json(shipment);
}

async function update(req, res) {
  try {
    const updatedShipment = await shipmentsService.update(
      req.params.id,
      req.body,
      req.session.userId
    );

    if (!updatedShipment) {
      throw new NotFound('Shipment not found');
    }

    return res.json(updatedShipment);
  } catch (err) {
    checkProductValidation(err);
    throw err;
  }
}

function checkProductValidation(err) {
  if (
    err instanceof MongooseError &&
    Object.keys(err.errors).some((k) => err.errors[k].kind === 'user defined')
  ) {
    const notExistedProductIds = Object.keys(err.errors).map(
      (k) => err.errors[k].value
    );
    throw new NotFound(
      `Product ${notExistedProductIds.join(', ')} does not exist`
    );
  }
}

module.exports = { getAll, create, getOne, update };
