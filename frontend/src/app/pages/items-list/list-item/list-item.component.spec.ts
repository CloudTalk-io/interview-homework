import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.item = {
      _id: '',
      description: '',
      editing: null,
      id: '',
      name: '',
      quantity: 0,
      unitPrice: 0,
      imageUrl: ''
    };
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    const fixture = TestBed.createComponent(ListItemComponent);
    const component = fixture.componentInstance;
    component.item = {
      _id: '',
      description: '',
      editing: null,
      id: '',
      name: '',
      quantity: 0,
      unitPrice: 0,
      imageUrl: ''
    };
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
  }));
});
