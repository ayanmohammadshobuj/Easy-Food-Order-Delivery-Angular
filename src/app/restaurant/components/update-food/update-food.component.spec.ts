import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFoodComponent } from './update-food.component';

describe('UpdateFoodComponent', () => {
  let component: UpdateFoodComponent;
  let fixture: ComponentFixture<UpdateFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
