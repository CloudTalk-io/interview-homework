import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Shipment, ShipmentDocument} from "../../schemas/shipment.schema";
import { Item, ItemDocument } from '../../schemas/item.schema';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectModel(Shipment.name) private shipmentModel: Model<ShipmentDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
  ) {}

  // Add methods to manipulate items
  async create(createShipmentDto: any): Promise<Shipment> {
    const createdShipment = new this.shipmentModel(createShipmentDto);
    return createdShipment.save();
  }

  async findAll(): Promise<Shipment[]> {
    return this.shipmentModel.find().exec();
  }

  async findOne(id: string): Promise<Shipment> {
    return this.shipmentModel.findById(id);
  }

  async update(id: string, updateShipmentDto: any): Promise<Shipment> {
    return this.shipmentModel.findByIdAndUpdate(id, updateShipmentDto, { new: true });
  }

  async delete(id: string): Promise<Shipment> {
    return this.shipmentModel.findByIdAndDelete(id);
  }
  // Methods for items
  async createItem(createItemDto: any): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  async findAllItems(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findItemById(id: string): Promise<Item> {
    return this.itemModel.findById(id);
  }

  async updateItem(id: string, updateItemDto: any): Promise<Item> {
    return this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true });
  }

  async deleteItem(id: string): Promise<Item> {
    return this.itemModel.findByIdAndDelete(id);
  }

  async addItemToShipment(shipmentId: string, itemId: string): Promise<Shipment> {
    const shipment = await this.shipmentModel.findById(shipmentId);
    console.log(shipment);
    const item = await this.itemModel.findById(itemId);
    console.log(item);
    if (!shipment || !item) {
      throw new Error('Shipment or Item not found');
    }
    shipment.items.push(item.id);
    return shipment.save();
  }
}
