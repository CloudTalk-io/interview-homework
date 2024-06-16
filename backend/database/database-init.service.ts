import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../schemas/item.schema';
import { Shipment, ShipmentDocument } from '../schemas/shipment.schema';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Shipment.name) private shipmentModel: Model<ShipmentDocument>,
  ) {}

  async onModuleInit() {
    await this.initDatabase();
  }

  async initDatabase(): Promise<void> {
    const items = [
      {
        name: 'Item 1',
        description: 'Description for Item 1',
        quantity: 100,
        unitPrice: 10.5,
        imageUrl: 'assets/symbol_white.svg',
      },
      {
        name: 'Item 2',
        description: 'Description for Item 2',
        quantity: 200,
        unitPrice: 20.5,
        imageUrl: 'assets/logo_black.svg',
      },
    ];

    const insertedItems = await this.itemModel.insertMany(items);

    const shipments = [
      {
        companyName: 'Company 1',
        creationDate: new Date(),
        scheduledShipmentDate: new Date(),
        items: [insertedItems[0]._id, insertedItems[1]._id],
        status: 'Created',
      },
      {
        companyName: 'Company 2',
        creationDate: new Date(),
        scheduledShipmentDate: new Date(),
        items: [insertedItems[0]._id],
        status: 'Created',
      },
    ];

    await this.shipmentModel.insertMany(shipments);
  }
}
