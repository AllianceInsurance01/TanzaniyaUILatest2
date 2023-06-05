import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralRequoteComponent } from './referral-requote.component';

describe('ReferralRequoteComponent', () => {
  let component: ReferralRequoteComponent;
  let fixture: ComponentFixture<ReferralRequoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralRequoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralRequoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
