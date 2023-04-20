import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { WarehouseItem } from "../../../core/models/warehouseItem";

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  const mockedInput: WarehouseItem = {
    imageUrl: `imageUrl`,
    id: 1,
    name: `name`,
    description: `description`,
    quantity: 2,
    unitPrice: 3,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.item = mockedInput;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
