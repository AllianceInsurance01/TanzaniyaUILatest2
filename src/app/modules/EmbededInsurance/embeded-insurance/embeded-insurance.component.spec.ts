import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbededInsuranceComponent } from './embeded-insurance.component';

describe('EmbededInsuranceComponent', () => {
  let component: EmbededInsuranceComponent;
  let fixture: ComponentFixture<EmbededInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbededInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbededInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
