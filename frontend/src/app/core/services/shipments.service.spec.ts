import { TestBed } from '@angular/core/testing';

import { ShipmentsService } from './shipments.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockShipment, mockShipmentDto } from 'src/app/mocks/shipment';
import { mockProduct } from 'src/app/mocks/product';
import { of } from 'rxjs';
import { Product } from '../models/product';

fdescribe('ShipmentsService', () => {
  let service: ShipmentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ShipmentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchAll', () => {
    it('should request and return shipments', () => {
      service.fetchAll().subscribe((shipments) => {
        expect(shipments.length).toBe(1);
        expect(shipments).toEqual([mockShipment]);
      });
      const request = httpTestingController.expectOne(`shipments`);
      expect(request.request.method).toBe('GET');
      request.flush([mockShipment]);
    });
  });

  describe('create', () => {
    it('should send POST request and return created shipment', () => {
      service.create(mockShipmentDto).subscribe((shipment) => {
        expect(shipment).toEqual(mockShipment);
      });
      const request = httpTestingController.expectOne(`shipments`);
      expect(request.request.method).toBe('POST');
      request.flush(mockShipment);
    });
  });

  describe('fetchOne', () => {
    it('should request and return shipments', () => {
      service.fetchOne(mockShipment._id).subscribe((shipment) => {
        expect(shipment).toEqual(mockShipment);
      });
      const request = httpTestingController.expectOne(`shipments/${mockShipment._id}`);
      expect(request.request.method).toBe('GET');
      request.flush(mockShipment);
    });
  });

  describe('update', () => {
    it('should send PATCH request and return updated shipment', () => {
      service.update(mockShipment._id, mockShipmentDto).subscribe((shipment) => {
        expect(shipment).toEqual(mockShipment);
      });
      const request = httpTestingController.expectOne(`shipments/${mockShipment._id}`);
      expect(request.request.method).toBe('PATCH');
      request.flush(mockShipment);
    });
  });

  describe('addProduct', () => {
    it('should call update method with correct DTO', () => {
      const productToAdd = {
        _id: 'some id',
      } as Product;
      service.addProduct(mockShipment, productToAdd).subscribe((shipment) => {
        expect(shipment).toEqual(mockShipment);
      });
      const request = httpTestingController.expectOne(`shipments/${mockShipment._id}`);
      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(
        jasmine.objectContaining({
          products: [
            ...mockShipment.products.map((p) => ({ product: p.product._id, quantity: p.quantity })),
            { product: productToAdd._id, quantity: 1 },
          ],
        }),
      );
      request.flush(mockShipment);
    });

    it('should merge duplicates', () => {
      service.addProduct(mockShipment, mockProduct).subscribe((shipment) => {
        expect(shipment).toEqual(mockShipment);
      });
      const request = httpTestingController.expectOne(`shipments/${mockShipment._id}`);
      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(
        jasmine.objectContaining({
          products: [
            ...mockShipment.products.map((p) => ({
              product: p.product._id,
              quantity: p.quantity + 1,
            })),
          ],
        }),
      );
      request.flush(mockShipment);
    });
  });
});
