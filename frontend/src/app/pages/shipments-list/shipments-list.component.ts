import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Shipment, ShipmentDto } from '../../core/models/shipment';
import { ItemsService } from '../../core/services/ItemsService';
import { ShipmentStatus } from '../../core/models/shipment-status.enum';
import { Item } from '../../core/models/item'; // Import ShipmentStatus

@Component({
  selector: 'app-shipments-list',
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss']
})
export class ShipmentsListComponent implements OnInit {
  shipments$: Observable<Shipment[]>;
  newShipment: ShipmentDto = {
    companyName: '',
    scheduledShipmentDate: '',
    status: ShipmentStatus.Created,
    items: []
  };

  updatedShipment: Shipment = {
    _id: '',
    companyName: '',
    creationDate: new Date(), // Add creationDate property
    scheduledShipmentDate: new Date(),
    status: ShipmentStatus.Created,
    items: []
  };
  shipmentStatuses = Object.values(ShipmentStatus); // Use ShipmentStatus to populate shipmentStatuses

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.shipments$ = this.itemsService.getShipments().pipe(
      switchMap((shipments: Shipment[]) => {
        // Fetch the items for each shipment
        const fetchItems$ = shipments.map((shipment: Shipment) =>
          this.itemsService.getItemsByIds(shipment.items.map(item => item._id)).pipe(
            map((items: Item[]) => {
              shipment.items = items;
              shipment.editing = null;
              return shipment;
            })
          )
        );
        return forkJoin(fetchItems$);
      })
    );
  }

  startEditing(shipment: Shipment): void {
    shipment.editing = { ...shipment };
  }

  updateShipment(shipment: Shipment): void {
    if (shipment.editing) {
      this.itemsService.updateShipment(shipment._id, shipment.editing).subscribe(() => {
        this.shipments$ = this.itemsService.getShipments();
      });
    }
  }
  createShipment(newShipment: ShipmentDto): void {
    newShipment.scheduledShipmentDate = new Date(newShipment.scheduledShipmentDate).toISOString();

    this.itemsService.createShipment(newShipment).subscribe(() => {
      this.shipments$ = this.itemsService.getShipments();
    });
  }
  deleteShipment(id: string): void {
    this.itemsService.deleteShipment(id).subscribe(() => {
      this.shipments$ = this.itemsService.getShipments();
    });
  }
}
