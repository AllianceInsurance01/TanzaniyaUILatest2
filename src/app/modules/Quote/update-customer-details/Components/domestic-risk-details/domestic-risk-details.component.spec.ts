import { ComponentFixture, TestBed } from '@angular/core/testing';

//import { DomesticQuoteDetailsComponent } from './domestic-quote-details.component';
import { DomesticRiskDetailsComponent } from './domestic-risk-details.component';

describe('DomesticQuoteDetailsComponent', () => {
  let component: DomesticRiskDetailsComponent;
  let fixture: ComponentFixture<DomesticRiskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesticRiskDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticRiskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
