import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingReferralComponent } from './existing-referral.component';

describe('ExistingReferralComponent', () => {
  let component: ExistingReferralComponent;
  let fixture: ComponentFixture<ExistingReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
