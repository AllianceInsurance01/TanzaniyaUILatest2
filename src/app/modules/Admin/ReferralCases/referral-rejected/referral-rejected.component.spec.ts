import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralRejectedComponent } from './referral-rejected.component';

describe('ReferralRejectedComponent', () => {
  let component: ReferralRejectedComponent;
  let fixture: ComponentFixture<ReferralRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
