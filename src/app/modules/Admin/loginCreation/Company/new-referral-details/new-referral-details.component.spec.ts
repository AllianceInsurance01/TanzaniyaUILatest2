import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewReferralDetailsComponent } from '../../../default-configuration/new-referral-details/new-referral-details.component';


describe('NewSectionDetailsComponent', () => {
  let component: NewReferralDetailsComponent;
  let fixture: ComponentFixture<NewReferralDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReferralDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReferralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
