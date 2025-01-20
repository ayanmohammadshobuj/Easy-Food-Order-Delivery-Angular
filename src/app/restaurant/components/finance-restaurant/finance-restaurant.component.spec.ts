import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceRestaurantComponent } from './finance-restaurant.component';

describe('FinanceRestaurantComponent', () => {
  let component: FinanceRestaurantComponent;
  let fixture: ComponentFixture<FinanceRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
