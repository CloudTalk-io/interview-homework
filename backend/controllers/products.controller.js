const productsService = require('../services/products.service');

async function getAll(req, res) {
  return res.json(await productsService.fetchAll());
}

module.exports = { getAll };
