import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  // Endpoints for shipments
  @Post('shipment')
  createShipment(@Body() createShipmentDto: any) {
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
  updateShipment(@Param('id') id: string, @Body() updateShipmentDto: any) {
    return this.warehouseService.update(id, updateShipmentDto);
  }

  @Delete('shipment/:id')
  deleteShipment(@Param('id') id: string) {
    return this.warehouseService.delete(id);
  }
  // Endpoints for products
  @Post('product')
  createProduct(@Body() createProductDto: any) {
    return this.warehouseService.createProduct(createProductDto);
  }

  @Get('products')
  findAllProducts() {
    return this.warehouseService.findAllProducts();
  }

  @Get('product/:id')
  findProductById(@Param('id') id: string) {
    return this.warehouseService.findProductById(id);
  }

  @Put('product/:id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.warehouseService.updateProduct(id, updateProductDto);
  }

  @Delete('product/:id')
  deleteProduct(@Param('id') id: string) {
    return this.warehouseService.deleteProduct(id);
  }
}
