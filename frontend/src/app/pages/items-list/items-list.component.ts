import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WarehouseItem } from '../../core/models/warehouseItem';
import { Shipment } from '../../core/models/shipment';
import { CreateItemDto, Item } from '../../core/models/item';
import { ItemsService } from '../../core/services/ItemsService';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  items$: Observable<WarehouseItem[]>;
  shipments$: Observable<Shipment[]>;
  shipmentId: string;
  newItem: CreateItemDto = { name: '', description: '', quantity: 0, unitPrice: 0, imageUrl: '' };
  updatedItem: Item = { _id: '', name: '', description: '', quantity: 0, unitPrice: 0, imageUrl: '' };

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.items$ = this.itemsService.getItems().pipe(
      map((items: WarehouseItem[]) => {
        items.forEach(item => item.editing = null);
        return items;
      })
    );
    this.shipments$ = this.itemsService.getShipments();
    this.shipments$.subscribe(shipments => {
      if (shipments.length > 0) {
        this.shipmentId = shipments[0]._id!;
      }
    });
  }

  startEditing(item: WarehouseItem): void {
    item.editing = { ...item };
  }

  updateItem(item: WarehouseItem): void {
    if (item.editing) {
      this.itemsService.updateItem(item._id, item.editing).subscribe(() => {
        this.items$ = this.itemsService.getItems() as Observable<WarehouseItem[]>;
      });
    }
  }
  addItemToShipment(itemId: string, shipmentId: string): void {
    this.itemsService.addToShipment(itemId, shipmentId).subscribe(() => {
      this.items$ = this.itemsService.getItems() as Observable<WarehouseItem[]>;
    });
  }

  deleteItem(id: string): void {
    this.itemsService.deleteItem(id).subscribe(() => {
      this.items$ = this.itemsService.getItems() as Observable<WarehouseItem[]>;
    });
  }

  createItem(item: CreateItemDto): void {
    this.itemsService.createItem(item).subscribe(() => {
      this.items$ = this.itemsService.getItems() as Observable<WarehouseItem[]>;
    });
  }
}
