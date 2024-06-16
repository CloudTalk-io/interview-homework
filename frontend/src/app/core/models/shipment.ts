import { ShipmentStatus } from './shipment-status.enum';
import { Item } from './item';
export interface Shipment {
  _id: string;
  companyName: string;
  creationDate: Date;
  scheduledShipmentDate: Date;
  items: Item[];
  status: ShipmentStatus;
  editing?: any;
}

export interface ShipmentDto {
  companyName: string;
  scheduledShipmentDate: string;
  status: ShipmentStatus;
  items: Item[];
}
