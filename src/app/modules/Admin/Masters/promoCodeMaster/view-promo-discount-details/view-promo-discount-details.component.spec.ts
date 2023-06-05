import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromoDiscountDetailsComponent } from './view-promo-discount-details.component';

describe('ViewPromoDiscountDetailsComponent', () => {
  let component: ViewPromoDiscountDetailsComponent;
  let fixture: ComponentFixture<ViewPromoDiscountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPromoDiscountDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPromoDiscountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
