import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Shipment, ShipmentDocument} from "../../schemas/shipment.schema";
import { Item, ItemDocument } from '../../schemas/item.schema';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectModel(Shipment.name) private shipmentModel: Model<ShipmentDocument>,
    @InjectModel(Item.name) private productModel: Model<ItemDocument>,
  ) {}

  // Add methods to manipulate products here
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
  // Methods for products
  async createProduct(createProductDto: any): Promise<Item> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAllProducts(): Promise<Item[]> {
    return this.productModel.find().exec();
  }

  async findProductById(id: string): Promise<Item> {
    return this.productModel.findById(id);
  }

  async updateProduct(id: string, updateProductDto: any): Promise<Item> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async deleteProduct(id: string): Promise<Item> {
    return this.productModel.findByIdAndDelete(id);
  }

}
