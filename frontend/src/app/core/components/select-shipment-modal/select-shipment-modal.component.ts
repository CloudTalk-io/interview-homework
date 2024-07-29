import { Component, HostBinding, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Shipment } from '../../models/shipment';
import { ShipmentsService } from '../../services/shipments.service';
import { ShipmentItemComponent } from '../shipment-item/shipment-item.component';
import { ModalRef } from '../../services/modal.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-shipment-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, ShipmentItemComponent],
  templateUrl: './select-shipment-modal.component.html',
  styleUrls: ['./select-shipment-modal.component.scss'],
})
export class SelectShipmentModalComponent {
  @HostBinding('class.modal') classModal = true;
  shipments$: Observable<Shipment[]> = this.shipmentsService.fetchAll();

  constructor(
    private shipmentsService: ShipmentsService,
    @Inject(ModalRef) public modalRef: ModalRef,
  ) {}
}
