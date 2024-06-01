import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShipmentDocument = Shipment & Document;

@Schema()
export class Shipment {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  shipmentId: string;

  @Prop({ default: Date.now })
  creationDate: Date;

  @Prop({ required: true })
  scheduledShipmentDate: Date;

  @Prop()
  items: string[];

  @Prop({ enum: ['Created', 'Prepared', 'Shipped'], default: 'Created' })
  status: string;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
