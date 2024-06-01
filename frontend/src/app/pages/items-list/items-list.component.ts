import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseItem } from '../../core/models/warehouseItem';
import {ItemsService} from "../../core/services/ItemsService";


@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  items$: Observable<WarehouseItem[]>;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.items$ = this.itemsService.getItems();
  }


  addItemToShipment(itemId: string, shipmentId: string): void {
    this.itemsService.addToShipment(itemId, shipmentId).subscribe(() => {
      // Refresh the list of items after an item is added to a shipment
      this.items$ = this.itemsService.getItems();
    });
  }

  deleteItem(id: string): void {
    this.itemsService.deleteItem(id).subscribe(() => {
      // Refresh the list of items after an item is deleted
      this.items$ = this.itemsService.getItems();
    });
  }
}
