import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SelectShipmentModalComponent } from './select-shipment-modal.component';
import { ModalRef } from '../../services/modal.service';

describe('SelectShipmentModalComponent', () => {
  let component: SelectShipmentModalComponent;
  let fixture: ComponentFixture<SelectShipmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SelectShipmentModalComponent],
      providers: [{ provide: ModalRef, useValue: { close: () => void 0 } }],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectShipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
