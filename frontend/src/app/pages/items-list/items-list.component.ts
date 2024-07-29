import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { noop, Observable } from 'rxjs';
import { Product } from '../../core/models/product';
import { ProductsService } from './products.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { SelectShipmentModalComponent } from 'src/app/core/components/select-shipment-modal/select-shipment-modal.component';
import { ShipmentsService } from 'src/app/core/services/shipments.service';
import { Shipment } from 'src/app/core/models/shipment';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent, SelectShipmentModalComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent {
  items$: Observable<Product[]> = this.productsService.fetchAll();

  @ViewChild('dummy') dummy: TemplatePortal;

  constructor(
    private productsService: ProductsService,
    private modalService: ModalService,
    private shipmentsService: ShipmentsService,
  ) {}

  addToShipment(product: Product) {
    const modalRef = this.modalService.open<Shipment>(SelectShipmentModalComponent);

    modalRef.afterClose.subscribe((shipment?: Shipment) => {
      if (shipment) {
        this.shipmentsService.addProduct(shipment, product).subscribe(noop);
      }
    });
  }
}
