import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapsedQuotesComponent } from './Lapsed-quotes.component';

describe('ExistingQuotesComponent', () => {
  let component: LapsedQuotesComponent;
  let fixture: ComponentFixture<LapsedQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LapsedQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LapsedQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
