import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralPendingComponent } from './referral-pending.component';

describe('ReferralPendingComponent', () => {
  let component: ReferralPendingComponent;
  let fixture: ComponentFixture<ReferralPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
