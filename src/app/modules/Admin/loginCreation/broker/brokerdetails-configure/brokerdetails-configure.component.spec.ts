import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerdetailsConfigureComponent } from './brokerdetails-configure.component';

describe('BrokerdetailsConfigureComponent', () => {
  let component: BrokerdetailsConfigureComponent;
  let fixture: ComponentFixture<BrokerdetailsConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerdetailsConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerdetailsConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
