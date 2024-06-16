import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateItemDto, Item } from '../models/item';
import { Shipment, ShipmentDto } from '../models/shipment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:3000/warehouse';

  constructor(private http: HttpClient) { }

  // Methods for items
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items`);
  }

  createItem(item: CreateItemDto): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/item`, item);
  }

  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/item/${id}`, item);
  }

  deleteItem(id: string): Observable<Item> {
    return this.http.delete<Item>(`${this.apiUrl}/item/${id}`);
  }
  getItemsByIds(ids: string[]): Observable<Item[]> {
    const params = ids.reduce((acc, id) => ({ ...acc, ids: id }), {});
    return this.http.get<Item[]>(`${this.apiUrl}/items`, { params });
  }
  // Methods for shipments
  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.apiUrl}/shipments`);
  }

  createShipment(shipment: ShipmentDto): Observable<Shipment> {
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
