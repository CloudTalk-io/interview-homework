import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';

describe('WarehouseController', () => {
  let controller: WarehouseController;
  let service: WarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseController],
      providers: [
        {
          provide: WarehouseService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            createItem: jest.fn().mockResolvedValue({}),
            findAllItems: jest.fn().mockResolvedValue([]),
            findItemById: jest.fn().mockResolvedValue({}),
            updateItem: jest.fn().mockResolvedValue({}),
            deleteItem: jest.fn().mockResolvedValue({}),
            addItemToShipment: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<WarehouseController>(WarehouseController);
    service = module.get<WarehouseService>(WarehouseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a shipment', async () => {
    const result = {};
    jest.spyOn(service, 'create').mockResolvedValue(result as any);
    expect(await controller.createShipment({} as any)).toBe(result);
  });

  it('should find all shipments', async () => {
    const result = [{}];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as any);
    expect(await controller.findAllShipments()).toBe(result);
  });

  it('should find one shipment', async () => {
    const result = {};
    jest.spyOn(service, 'findOne').mockResolvedValue(result as any);
    expect(await controller.findShipmentById('1')).toBe(result);
  });

  it('should update a shipment', async () => {
    const result = {};
    jest.spyOn(service, 'update').mockResolvedValue(result as any);
    expect(await controller.updateShipment('1', {} as any)).toBe(result);
  });

  it('should delete a shipment', async () => {
    const result = {};
    jest.spyOn(service, 'delete').mockResolvedValue(result as any);
    expect(await controller.deleteShipment('1')).toBe(result);
  });

  it('should create an item', async () => {
    const result = {};
    jest.spyOn(service, 'createItem').mockResolvedValue(result as any);
    expect(await controller.createItem({} as any)).toBe(result);
  });

  it('should find all items', async () => {
    const result = [{}];
    jest.spyOn(service, 'findAllItems').mockResolvedValue(result as any);
    expect(await controller.findAllItems()).toBe(result);
  });

  it('should find one item', async () => {
    const result = {};
    jest.spyOn(service, 'findItemById').mockResolvedValue(result as any);
    expect(await controller.findItemById('1')).toBe(result);
  });

  it('should update an item', async () => {
    const result = {};
    jest.spyOn(service, 'updateItem').mockResolvedValue(result as any);
    expect(await controller.updateItem('1', {} as any)).toBe(result);
  });

  it('should delete an item', async () => {
    const result = {};
    jest.spyOn(service, 'deleteItem').mockResolvedValue(result as any);
    expect(await controller.deleteItem('1')).toBe(result);
  });

  it('should add an item to a shipment', async () => {
    const result = {};
    jest.spyOn(service, 'addItemToShipment').mockResolvedValue(result as any);
    expect(await controller.addItemToShipment('1', { itemId: '1' })).toBe(result);
  });
});
