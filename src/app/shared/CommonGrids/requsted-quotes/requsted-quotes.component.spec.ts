import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequstedQuotesComponent } from './requsted-quotes.component';

describe('PendingCustomerComponent', () => {
  let component: RequstedQuotesComponent;
  let fixture: ComponentFixture<RequstedQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequstedQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequstedQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
