import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shipment } from 'src/app/core/models/shipment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shipment-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shipment-item.component.html',
  styleUrls: ['./shipment-item.component.scss'],
})
export class ShipmentItemComponent {
  @Input() shipment: Shipment;
}
