import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { mockProduct } from '../../mocks/product';
import { environment } from '../../../environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchAll', () => {
    it('should request and return products', () => {
      service.fetchAll().subscribe((products) => {
        expect(products.length).toBe(1);
        expect(products).toEqual([mockProduct]);
      });
      const request = httpTestingController.expectOne(`products`);
      expect(request.request.method).toBe('GET');
      request.flush([mockProduct]);
    });
  });
});
