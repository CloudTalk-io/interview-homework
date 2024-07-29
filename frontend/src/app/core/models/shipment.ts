import { Product } from './product';

export interface Shipment extends Omit<RawShipment, 'shipmentDate' | 'createdAt'> {
  shipmentDate: Date | null;
  createdAt: Date;
}

export enum ShipmentStatus {
  Created = 'created',
  Prepared = 'prepared',
  Shipped = 'shipped',
}

export interface RawShipment {
  _id: string;
  companyName: string;
  shipmentDate: string;
  status: ShipmentStatus;
  products: { product: Product; quantity: number }[];
  createdAt: string;
  createdBy: string;
}
