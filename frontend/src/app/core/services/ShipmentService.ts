// frontend/src/app/core/services/ShipmentsService.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment } from '../models/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  private apiUrl = 'http://localhost:3000'; // replace with your API URL

  constructor(private http: HttpClient) { }

  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.apiUrl}/shipments`);
  }

  getShipment(id: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/shipments/${id}`);
  }

  createShipment(shipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(`${this.apiUrl}/shipments`, shipment);
  }

  updateShipment(id: string, shipment: Shipment): Observable<Shipment> {
    return this.http.put<Shipment>(`${this.apiUrl}/shipments/${id}`, shipment);
  }

  deleteShipment(id: string): Observable<Shipment> {
    return this.http.delete<Shipment>(`${this.apiUrl}/shipments/${id}`);
  }
}
