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
  shipmentId: string;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.items$ = this.itemsService.getItems();
    this.shipmentId = '665a351a4a6f7ac12beb5f18';
  }

  addItemToShipment(itemId: string, shipmentId: string): void {
    this.itemsService.addToShipment(itemId, shipmentId).subscribe(() => {
      this.items$ = this.itemsService.getItems();
    });
  }

  deleteItem(id: string): void {
    this.itemsService.deleteItem(id).subscribe(() => {
      this.items$ = this.itemsService.getItems();
    });
  }
}
