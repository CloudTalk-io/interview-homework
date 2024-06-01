// backend/warehouse-api/src/warehouse/warehouse.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { Shipment, ShipmentSchema } from '../../schemas/shipment.schema';
import { Item, ItemSchema } from '../../schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shipment.name, schema: ShipmentSchema },
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
