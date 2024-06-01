// frontend/src/app/pages/warehouse-status/warehouse-status.component.ts

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../core/models/item';
import { ItemsService } from '../../core/services/ItemsService';

@Component({
  selector: 'app-warehouse-status',
  templateUrl: './warehouse-status.component.html',
  styleUrls: ['./warehouse-status.component.scss']
})
export class WarehouseStatusComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.items$ = this.itemsService.getItems();
  }
}
