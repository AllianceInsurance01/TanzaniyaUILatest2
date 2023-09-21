import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeRiskDetailsComponent } from './life-risk-details.component';

describe('LifeRiskDetailsComponent', () => {
  let component: LifeRiskDetailsComponent;
  let fixture: ComponentFixture<LifeRiskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeRiskDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeRiskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
