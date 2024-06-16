import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateShipmentDto } from '../../items/dto/create-shipment.dto';
import { CreateItemDto } from '../../items/dto/create-item.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  // Endpoints for shipments
  @Post('shipment')
  createShipment(@Body() createShipmentDto: CreateShipmentDto) {
    return this.warehouseService.create(createShipmentDto);
  }

  @Get('shipments')
  findAllShipments() {
    return this.warehouseService.findAll();
  }

  @Get('shipment/:id')
  findShipmentById(@Param('id') id: string) {
    return this.warehouseService.findOne(id);
  }

  @Put('shipment/:id')
  updateShipment(@Param('id') id: string, @Body() updateShipmentDto: CreateShipmentDto) {
    return this.warehouseService.update(id, updateShipmentDto);
  }

  @Delete('shipment/:id')
  deleteShipment(@Param('id') id: string) {
    return this.warehouseService.delete(id);
  }

  // Endpoints for items
  @Post('item')
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.warehouseService.createItem(createItemDto);
  }

  @Get('items')
  findAllItems() {
    return this.warehouseService.findAllItems();
  }

  @Get('item/:id')
  findItemById(@Param('id') id: string) {
    return this.warehouseService.findItemById(id);
  }

  @Put('item/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: CreateItemDto) {
    return this.warehouseService.updateItem(id, updateItemDto);
  }

  @Delete('item/:id')
  deleteItem(@Param('id') id: string) {
    return this.warehouseService.deleteItem(id);
  }

  @Post('shipment/:id/add-item')
  addItemToShipment(@Param('id') id: string, @Body() addItemDto: { itemId: string }) {
    return this.warehouseService.addItemToShipment(id, addItemDto.itemId);
  }
}
