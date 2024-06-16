import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseService } from './warehouse.service';
import { getModelToken } from '@nestjs/mongoose';
import { Shipment } from '../../schemas/shipment.schema';
import { Item } from '../../schemas/item.schema';


describe('WarehouseService', () => {
  let service: WarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarehouseService,
        {
          provide: getModelToken(Shipment.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
            findByIdAndDelete: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: getModelToken(Item.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
            findByIdAndDelete: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<WarehouseService>(WarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a shipment', async () => {
    const result = {};
    jest.spyOn(service, 'create').mockResolvedValue(result as any);
    expect(await service.create({} as any)).toBe(result);
  });

  it('should find all shipments', async () => {
    const result = [{}];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as any);
    expect(await service.findAll()).toBe(result);
  });

  it('should find one shipment', async () => {
    const result = {};
    jest.spyOn(service, 'findOne').mockResolvedValue(result as any);
    expect(await service.findOne('1')).toBe(result);
  });

  it('should update a shipment', async () => {
    const result = {};
    jest.spyOn(service, 'update').mockResolvedValue(result as any);
    expect(await service.update('1', {} as any)).toBe(result);
  });

  it('should delete a shipment', async () => {
    const result = {};
    jest.spyOn(service, 'delete').mockResolvedValue(result as any);
    expect(await service.delete('1')).toBe(result);
  });

  it('should create an item', async () => {
    const result = {};
    jest.spyOn(service, 'createItem').mockResolvedValue(result as any);
    expect(await service.createItem({} as any)).toBe(result);
  });

  it('should find all items', async () => {
    const result = [{}];
    jest.spyOn(service, 'findAllItems').mockResolvedValue(result as any);
    expect(await service.findAllItems()).toBe(result);
  });

  it('should find one item', async () => {
    const result = {};
    jest.spyOn(service, 'findItemById').mockResolvedValue(result as any);
    expect(await service.findItemById('1')).toBe(result);
  });

  it('should update an item', async () => {
    const result = {};
    jest.spyOn(service, 'updateItem').mockResolvedValue(result as any);
    expect(await service.updateItem('1', {} as any)).toBe(result);
  });

  it('should delete an item', async () => {
    const result = {};
    jest.spyOn(service, 'deleteItem').mockResolvedValue(result as any);
    expect(await service.deleteItem('1')).toBe(result);
  });

  it('should add an item to a shipment', async () => {
    const result = {};
    jest.spyOn(service, 'addItemToShipment').mockResolvedValue(result as any);
    expect(await service.addItemToShipment('1', '1')).toBe(result);
  });
});
