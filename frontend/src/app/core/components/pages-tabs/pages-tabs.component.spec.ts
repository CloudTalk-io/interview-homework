import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PagesTabsComponent } from './pages-tabs.component';

describe('PagesTabsComponent', () => {
  let component: PagesTabsComponent;
  let fixture: ComponentFixture<PagesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PagesTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
