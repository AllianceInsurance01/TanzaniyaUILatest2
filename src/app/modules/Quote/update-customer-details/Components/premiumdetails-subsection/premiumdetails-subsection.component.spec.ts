import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumdetailsSubsectionComponent } from './premiumdetails-subsection.component';

describe('PremiumdetailsSubsectionComponent', () => {
  let component: PremiumdetailsSubsectionComponent;
  let fixture: ComponentFixture<PremiumdetailsSubsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumdetailsSubsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumdetailsSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
