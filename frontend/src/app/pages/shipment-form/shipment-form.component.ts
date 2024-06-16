import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Shipment } from '../../core/models/shipment';
import { ShipmentStatus } from '../../core/models/shipment-status.enum';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.scss']
})
export class ShipmentFormComponent implements OnInit {
  @Input() shipment: Shipment;
  @Output() formSubmit = new EventEmitter<Shipment>();
  shipmentForm: FormGroup;
  shipmentStatuses = Object.values(ShipmentStatus);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.shipmentForm = this.fb.group({
      companyName: [this.shipment?.companyName || '', Validators.required],
      scheduledShipmentDate: [this.shipment?.scheduledShipmentDate || '', Validators.required],
      status: [this.shipment?.status || '', Validators.required],
      items: this.fb.array(this.shipment?.items.map(item => this.createItemGroup(item)) || [])
    });
  }

  createItemGroup(item: any): FormGroup {
    return this.fb.group({
      name: [item.name, Validators.required],
      description: [item.description, Validators.required],
      quantity: [item.quantity, Validators.required],
      unitPrice: [item.unitPrice, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.shipmentForm.valid) {
      this.formSubmit.emit(this.shipmentForm.value);
    }
  }

  get items(): FormArray {
    return this.shipmentForm.get('items') as FormArray;
  }
}
