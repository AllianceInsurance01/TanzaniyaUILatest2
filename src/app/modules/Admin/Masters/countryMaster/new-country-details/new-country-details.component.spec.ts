import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCountryDetailsComponent } from './new-country-details.component';

describe('NewCountryDetailsComponent', () => {
  let component: NewCountryDetailsComponent;
  let fixture: ComponentFixture<NewCountryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCountryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
