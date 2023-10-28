import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSearchDetailsComponent } from './vehicle-search-details.component';

describe('VehicleSearchDetailsComponent', () => {
  let component: VehicleSearchDetailsComponent;
  let fixture: ComponentFixture<VehicleSearchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleSearchDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
