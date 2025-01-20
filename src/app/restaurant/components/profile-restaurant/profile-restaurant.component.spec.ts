import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRestaurantComponent } from './profile-restaurant.component';

describe('ProfileRestaurantComponent', () => {
  let component: ProfileRestaurantComponent;
  let fixture: ComponentFixture<ProfileRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
