import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerDetailsComponent } from './new-customer-details.component';

describe('NewCustomerDetailsComponent', () => {
  let component: NewCustomerDetailsComponent;
  let fixture: ComponentFixture<NewCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustomerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
