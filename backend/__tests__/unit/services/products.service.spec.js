const mockingoose = require('mockingoose');
const Product = require('../../../models/product.model');
const { fetchAll } = require('../../../services/products.service');
const productFixture = require('../../fixtures/product');

describe('Products service', () => {
  describe('fetchAll', () => {
    it('should return the list of products', async () => {
      mockingoose(Product).toReturn([productFixture], 'find');
      const results = await fetchAll();
      expect(results[0].name).toBe(productFixture.name);
    });
  });
});
