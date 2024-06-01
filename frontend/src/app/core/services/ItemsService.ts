// frontend/src/app/core/services/ItemsService.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WarehouseItem } from '../models/warehouseItem';
import { Shipment } from '../models/shipment';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Methods for items
  getItems(): Observable<WarehouseItem[]> {
    return this.http.get<WarehouseItem[]>(`${this.apiUrl}/products`);
  }

  createItem(item: WarehouseItem): Observable<WarehouseItem> {
    return this.http.post<WarehouseItem>(`${this.apiUrl}/product`, item);
  }

  updateItem(id: string, item: WarehouseItem): Observable<WarehouseItem> {
    return this.http.put<WarehouseItem>(`${this.apiUrl}/product/${id}`, item);
  }

  deleteItem(id: string): Observable<WarehouseItem> {
    return this.http.delete<WarehouseItem>(`${this.apiUrl}/product/${id}`);
  }

  // Methods for shipments
  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.apiUrl}/shipments`);
  }

  createShipment(shipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(`${this.apiUrl}/shipment`, shipment);
  }

  updateShipment(id: string, shipment: Shipment): Observable<Shipment> {
    return this.http.put<Shipment>(`${this.apiUrl}/shipment/${id}`, shipment);
  }

  deleteShipment(id: string): Observable<Shipment> {
    return this.http.delete<Shipment>(`${this.apiUrl}/shipment/${id}`);
  }

  addToShipment(itemId: string, shipmentId: string): Observable<Shipment> {
    return this.http.post<Shipment>(`${this.apiUrl}/shipment/${shipmentId}/add-item`, { itemId });
  }

}
