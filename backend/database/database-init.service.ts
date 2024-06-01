// src/database-init/database-init.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../schemas/item.schema';
import { Shipment, ShipmentDocument } from '../schemas/shipment.schema';

@Injectable()
export class DatabaseInitService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>, //
    @InjectModel(Shipment.name) private shipmentModel: Model<ShipmentDocument>,
  ) {}

  async initDatabase(): Promise<void> {
    // Define your items here
    const items = [
      {
        name: 'Item 1',
        description: 'Description for Item 1',
        quantity: 100,
        unitPrice: 10.5
      },
      {
        name: 'Item 2',
        description: 'Description for Item 2',
        quantity: 200,
        unitPrice: 20.5
      },
    ];

    // Define your shipments here
    const shipments = [
      {
        companyName: 'Company 1',
        shipmentId: 'SHIPMENT1',
        creationDate: new Date(),
        scheduledShipmentDate: new Date(),
        items: ['Item 1', 'Item 2'],
        status: 'Created'
      },
      {
        companyName: 'Company 2',
        shipmentId: 'SHIPMENT2',
        creationDate: new Date(),
        scheduledShipmentDate: new Date(),
        items: ['Item 1'],
        status: 'Created'
      },
    ];

    // Insert products and shipments into the database
    await this.itemModel.insertMany(items);
    await this.shipmentModel.insertMany(shipments);
  }
}
