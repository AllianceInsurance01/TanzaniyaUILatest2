import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralApprovedComponent } from './referral-approved.component';

describe('ReferralApprovedComponent', () => {
  let component: ReferralApprovedComponent;
  let fixture: ComponentFixture<ReferralApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
