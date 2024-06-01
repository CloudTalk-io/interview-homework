// frontend/src/app/core/models/shipment.ts

import { Item } from './item';

export interface Shipment {
  companyName: string;
  shipmentId: string;
  creationDate: Date;
  scheduledShipmentDate: Date;
  items: Item[];
  status: string;
}
