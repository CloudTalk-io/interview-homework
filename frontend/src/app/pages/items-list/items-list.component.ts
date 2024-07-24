import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { Observable, of } from 'rxjs';
import { Product } from '../../core/models/product';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent {
  items$: Observable<Product[]> = this.productsService.fetchAll();

  constructor(private productsService: ProductsService) {}
}
