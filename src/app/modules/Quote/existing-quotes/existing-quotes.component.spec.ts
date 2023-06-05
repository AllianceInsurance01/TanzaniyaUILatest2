import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingQuotesComponent } from './existing-quotes.component';

describe('ExistingQuotesComponent', () => {
  let component: ExistingQuotesComponent;
  let fixture: ComponentFixture<ExistingQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
