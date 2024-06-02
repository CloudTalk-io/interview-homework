import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseModule } from './src/warehouse/warehouse.module';
import { DatabaseInitService } from './database/database-init.service';
import { Item, ItemSchema } from './schemas/item.schema';
import { Shipment, ShipmentSchema } from './schemas/shipment.schema';

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${username}:${password}@cluster-1.ldrwh8g.mongodb.net/warehouseDb?retryWrites=true&w=majority&appName=Cluster-1`, {
      connectionFactory: (connection) => {
        connection.on('error', console.error.bind(console, 'connection error:'));
        return connection;
      },
    }),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    MongooseModule.forFeature([{ name: Shipment.name, schema: ShipmentSchema }]),
    WarehouseModule,
  ],
  providers: [DatabaseInitService],
})
export class AppModule {}
