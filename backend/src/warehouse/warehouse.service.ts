import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment, ShipmentDocument } from '../../schemas/shipment.schema';
import { Item, ItemDocument } from '../../schemas/item.schema';
import { CreateShipmentDto } from '../../items/dto/create-shipment.dto';
import { CreateItemDto } from '../../items/dto/create-item.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectModel(Shipment.name) private shipmentModel: Model<ShipmentDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const createdShipment = new this.shipmentModel(createShipmentDto);
    return createdShipment.save();
  }

  async findAll(): Promise<Shipment[]> {
    return this.shipmentModel.find().populate('items').exec();
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.shipmentModel.findById(id).populate('items').exec();
    if (!shipment) {
      throw new NotFoundException('Shipment not found');
    }
    return shipment;
  }

  async update(id: string, updateShipmentDto: any): Promise<Shipment> {
    const updatedShipment = await this.shipmentModel.findByIdAndUpdate(id, updateShipmentDto, { new: true }).exec();
    if (!updatedShipment) {
      throw new NotFoundException('Shipment not found');
    }
    return updatedShipment;
  }

  async delete(id: string): Promise<Shipment> {
    const deletedShipment = await this.shipmentModel.findByIdAndDelete(id).exec();
    if (!deletedShipment) {
      throw new NotFoundException('Shipment not found');
    }
    return deletedShipment;
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  async findAllItems(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findItemById(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async updateItem(id: string, updateItemDto: any): Promise<Item> {
    const updatedItem = await this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
    if (!updatedItem) {
      throw new NotFoundException('Item not found');
    }
    return updatedItem;
  }

  async deleteItem(id: string): Promise<Item> {
    const deletedItem = await this.itemModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException('Item not found');
    }
    return deletedItem;
  }

  async addItemToShipment(shipmentId: string, itemId: string): Promise<Shipment> {
    const shipment = await this.shipmentModel.findById(shipmentId).exec();
    const item = await this.itemModel.findById(itemId).exec();
    if (!shipment || !item) {
      throw new NotFoundException('Shipment or Item not found');
    }
    shipment.items.push(item.id);
    return shipment.save();
  }
}
