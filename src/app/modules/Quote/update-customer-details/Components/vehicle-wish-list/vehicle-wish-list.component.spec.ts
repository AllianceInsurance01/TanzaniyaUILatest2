import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleWishListComponent } from './vehicle-wish-list.component';

describe('VehicleWishListComponent', () => {
  let component: VehicleWishListComponent;
  let fixture: ComponentFixture<VehicleWishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleWishListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
