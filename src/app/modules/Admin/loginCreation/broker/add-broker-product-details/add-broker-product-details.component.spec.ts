import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrokerProductDetailsComponent } from './add-broker-product-details.component';

describe('AddBrokerProductDetailsComponent', () => {
  let component: AddBrokerProductDetailsComponent;
  let fixture: ComponentFixture<AddBrokerProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrokerProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrokerProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
