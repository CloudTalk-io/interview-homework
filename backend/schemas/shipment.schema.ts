import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShipmentDocument = Shipment & Document;

@Schema()
export class Shipment {
  @Prop({ required: true })
  companyName: string;

  @Prop({ default: Date.now })
  creationDate: Date;

  @Prop({ required: true })
  scheduledShipmentDate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }] })
  items: Types.ObjectId[];

  @Prop({ enum: ['Created', 'Prepared', 'Shipped'], default: 'Created' })
  status: string;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
