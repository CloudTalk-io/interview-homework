const mockingoose = require('mockingoose');
const Shipment = require('../../../models/shipment.model');
const shipmentsService = require('../../../services/shipments.service');
const shipmentFixture = require('../../fixtures/shipment');
const shipmentDtoFixture = require('../../fixtures/shipment-dto');
const { fetchAll, create, fetchOne, update } = shipmentsService;

const shipmentId = 'shipment-id';
const userId = 'user-id';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Shipments service', () => {
  describe('fetchAll', () => {
    it('should return the list of shipments', async () => {
      mockingoose(Shipment).toReturn([shipmentFixture], 'find');
      const results = await fetchAll(userId);
      expect(results[0].companyName).toBe(shipmentFixture.companyName);
    });
  });

  describe('fetchOne', () => {
    it('should return one shipment', async () => {
      mockingoose(Shipment).toReturn(shipmentFixture, 'findOne');
      const result = await fetchOne(shipmentId, userId);
      expect(result.companyName).toBe(shipmentFixture.companyName);
    });
  });

  describe('update', () => {
    it('should return updated shipment', async () => {
      const shipmentDto = { companyName: 'new company name', products: [] };
      mockingoose(Shipment)
        .toReturn(shipmentFixture, 'findOne')
        .toReturn(
          {
            ...shipmentFixture,
            ...shipmentDto,
          },
          'findOne'
        );
      const result = await update(shipmentId, shipmentDto, userId);
      expect(result.companyName).toBe(shipmentDto.companyName);
    });

    it('should return null if shipment is not found', async () => {
      mockingoose(Shipment).toReturn(null, 'findOne');
      const result = await update(shipmentId, shipmentDtoFixture, userId);
      expect(result).toBeNull();
    });
  });
});
