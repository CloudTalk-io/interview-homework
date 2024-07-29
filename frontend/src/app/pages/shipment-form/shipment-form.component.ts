import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shipment, ShipmentStatus } from 'src/app/core/models/shipment';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShipmentsService } from 'src/app/core/services/shipments.service';
import { dateToInputString } from 'src/app/helpers/date';
import { Product } from 'src/app/core/models/product';

interface ShipmentForm {
  companyName: FormControl<string>;
  shipmentDate: FormControl<string | null>;
  status?: FormControl<ShipmentStatus | null>;
  products: FormArray<
    FormGroup<{
      product: FormControl<Product>;
      quantity: FormControl<number>;
    }>
  >;
}

@Component({
  selector: 'app-shipment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.scss'],
})
export class ShipmentFormComponent implements OnInit {
  shipmentStatusesValues = Object.values(ShipmentStatus);
  form: FormGroup<ShipmentForm>;
  shipmentId: string | null;

  get productsFromArray() {
    return this.form.get('products') as ShipmentForm['products'];
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private shipmentsService: ShipmentsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.shipmentId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.shipmentId) {
      this.shipmentsService.fetchOne(this.shipmentId).subscribe({
        next: (shipment) => this.createForm(shipment),
        error: () => this.router.navigateByUrl('/shipments'),
      });
    } else {
      this.createForm();
    }
  }

  saveShipment() {
    const { companyName, shipmentDate, status, products: productsValue } = this.form.getRawValue();
    const products = productsValue.map((p) => ({ product: p.product._id, quantity: p.quantity }));
    const shipmentDto = {
      companyName,
      shipmentDate: shipmentDate || undefined,
      status: status || undefined,
      products: products?.length ? products : undefined,
    };
    (this.shipmentId
      ? this.shipmentsService.update(this.shipmentId, shipmentDto)
      : this.shipmentsService.create(shipmentDto)
    ).subscribe(() => {
      this.router.navigateByUrl('/shipments');
    });
  }

  private createForm(defaultValues?: Shipment) {
    this.form = new FormGroup<ShipmentForm>({
      companyName: new FormControl(defaultValues?.companyName || '', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      shipmentDate: new FormControl(
        defaultValues?.shipmentDate ? dateToInputString(defaultValues?.shipmentDate) : null,
      ),
      status: new FormControl(defaultValues?.status || null),
      products: new FormArray(
        defaultValues?.products
          ? defaultValues?.products.map(
              (p) =>
                new FormGroup({
                  product: new FormControl(p.product, { nonNullable: true }),
                  quantity: new FormControl(p.quantity, {
                    nonNullable: true,
                    validators: [
                      Validators.required,
                      Validators.min(1),
                      Validators.max(p.product.quantity),
                    ],
                  }),
                }),
            )
          : [],
      ),
    });
  }
}
