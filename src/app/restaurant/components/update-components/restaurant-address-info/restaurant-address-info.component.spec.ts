import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAddressInfoComponent } from './restaurant-address-info.component';

describe('RestaurantAddressInfoComponent', () => {
  let component: RestaurantAddressInfoComponent;
  let fixture: ComponentFixture<RestaurantAddressInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantAddressInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantAddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
