import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentItemComponent } from './shipment-item.component';

describe('ShipmentItemComponent', () => {
  let component: ShipmentItemComponent;
  let fixture: ComponentFixture<ShipmentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ShipmentItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
