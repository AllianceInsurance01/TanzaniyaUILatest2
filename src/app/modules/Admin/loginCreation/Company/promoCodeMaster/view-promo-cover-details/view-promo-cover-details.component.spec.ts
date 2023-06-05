import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromoCoverDetailsComponent } from './view-promo-cover-details.component';

describe('ViewPromoCoverDetailsComponent', () => {
  let component: ViewPromoCoverDetailsComponent;
  let fixture: ComponentFixture<ViewPromoCoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPromoCoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPromoCoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
