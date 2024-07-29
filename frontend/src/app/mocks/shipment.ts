import { Shipment, ShipmentStatus } from '../core/models/shipment';
import { ShipmentDto } from '../core/services/shipments.service';
import { mockProduct } from './product';

export const mockShipment: Shipment = {
  _id: '66a795049e227ca263e2b1dc',
  companyName: 'Some company name',
  shipmentDate: new Date(),
  status: ShipmentStatus.Created,
  products: [{ product: mockProduct, quantity: 10 }],
  createdAt: new Date(),
  createdBy: '66a7954974d88f9111639b24',
};

export const mockShipmentDto: ShipmentDto = {
  ...mockShipment,
  shipmentDate: new Date().toISOString(),
  products: [{ product: mockProduct._id, quantity: 10 }],
};
