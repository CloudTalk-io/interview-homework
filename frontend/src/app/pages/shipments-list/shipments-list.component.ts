// frontend/src/app/pages/shipments-list/shipments-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipment } from '../../core/models/shipment';
import { ItemsService } from '../../core/services/ItemsService';

@Component({
  selector: 'app-shipments-list',
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss']
})
export class ShipmentsListComponent implements OnInit {
  shipments$: Observable<Shipment[]>;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.shipments$ = this.itemsService.getShipments(); // get shipments from service
  }

  deleteShipment(id: string): void {
    this.itemsService.deleteShipment(id).subscribe(() => {
      // Refresh the list of shipments after a shipment is deleted
      this.shipments$ = this.itemsService.getShipments();
    });
  }
}
