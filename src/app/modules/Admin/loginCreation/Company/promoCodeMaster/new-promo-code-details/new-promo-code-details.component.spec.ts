import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromoCodeDetailsComponent } from './new-promo-code-details.component';

describe('NewPromoCodeDetailsComponent', () => {
  let component: NewPromoCodeDetailsComponent;
  let fixture: ComponentFixture<NewPromoCodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPromoCodeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPromoCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
