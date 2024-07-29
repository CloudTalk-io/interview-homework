import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentItemComponent } from '../../core/components/shipment-item/shipment-item.component';
import { Observable } from 'rxjs';
import { Shipment } from '../../core/models/shipment';
import { ShipmentsService } from '../../core/services/shipments.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shipments-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ShipmentItemComponent],
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss'],
})
export class ShipmentsListComponent {
  shipments$: Observable<Shipment[]> = this.shipmentsService.fetchAll();

  constructor(private shipmentsService: ShipmentsService) {}
}
