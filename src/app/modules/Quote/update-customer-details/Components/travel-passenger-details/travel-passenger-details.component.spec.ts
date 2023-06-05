import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPassengerDetailsComponent } from './travel-passenger-details.component';

describe('TravelPassengerDetailsComponent', () => {
  let component: TravelPassengerDetailsComponent;
  let fixture: ComponentFixture<TravelPassengerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelPassengerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPassengerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
