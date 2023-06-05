import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticQuoteDetailsComponent } from './domestic-quote-details.component';

describe('DomesticQuoteDetailsComponent', () => {
  let component: DomesticQuoteDetailsComponent;
  let fixture: ComponentFixture<DomesticQuoteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesticQuoteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticQuoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
