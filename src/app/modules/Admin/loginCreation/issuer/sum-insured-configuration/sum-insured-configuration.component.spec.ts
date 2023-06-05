import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumInsuredConfigurationComponent } from './sum-insured-configuration.component';

describe('SumInsuredConfigurationComponent', () => {
  let component: SumInsuredConfigurationComponent;
  let fixture: ComponentFixture<SumInsuredConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumInsuredConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumInsuredConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
