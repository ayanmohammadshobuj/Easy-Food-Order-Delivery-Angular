import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantContactInfoComponent } from './restaurant-contact-info.component';

describe('RestaurantContactInfoComponent', () => {
  let component: RestaurantContactInfoComponent;
  let fixture: ComponentFixture<RestaurantContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantContactInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
