import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RawShipment, Shipment } from '../../core/models/shipment';
import { Product } from '../models/product';

export interface ShipmentDto
  extends Partial<Omit<Shipment, '_id' | 'createdBy' | 'shipmentDate' | 'products'>> {
  shipmentDate?: string;
  products?: { product: string; quantity: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class ShipmentsService {
  constructor(private httpClient: HttpClient) {}

  fetchAll(): Observable<Shipment[]> {
    return this.httpClient
      .get<RawShipment[]>('shipments')
      .pipe(map((list) => list.map(this.mapRawShipment)));
  }

  create(shipmentDto: ShipmentDto) {
    return this.httpClient
      .post<RawShipment>('shipments', shipmentDto)
      .pipe(map(this.mapRawShipment));
  }

  fetchOne(id: string): Observable<Shipment> {
    return this.httpClient.get<RawShipment>(`shipments/${id}`).pipe(map(this.mapRawShipment));
  }

  update(id: string, shipmentDto: ShipmentDto) {
    return this.httpClient
      .patch<RawShipment>(`shipments/${id}`, {
        ...shipmentDto,
        products: shipmentDto.products || undefined,
      })
      .pipe(map(this.mapRawShipment));
  }

  addProduct(shipment: Shipment, product: Product) {
    return this.update(shipment._id, {
      products: [
        ...shipment.products.map((p) => ({
          product: p.product._id,
          quantity: p.product._id === product._id ? p.quantity + 1 : p.quantity,
        })),
        ...(!shipment.products.some((p) => p.product._id == product._id)
          ? [{ product: product._id, quantity: 1 }]
          : []),
      ],
    });
  }

  private mapRawShipment(rawShipment: RawShipment): Shipment {
    return {
      ...rawShipment,
      shipmentDate: rawShipment.shipmentDate ? new Date(rawShipment.shipmentDate) : null,
      createdAt: new Date(rawShipment.createdAt),
    };
  }
}
