import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerProfileUpdateComponent } from './owner-profile-update.component';

describe('OwnerProfileUpdateComponent', () => {
  let component: OwnerProfileUpdateComponent;
  let fixture: ComponentFixture<OwnerProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerProfileUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
