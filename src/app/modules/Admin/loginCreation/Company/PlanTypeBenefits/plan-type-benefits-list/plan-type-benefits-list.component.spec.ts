import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTypeBenefitsListComponent } from './plan-type-benefits-list.component';

describe('PlanTypeBenefitsListComponent', () => {
  let component: PlanTypeBenefitsListComponent;
  let fixture: ComponentFixture<PlanTypeBenefitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanTypeBenefitsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanTypeBenefitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
