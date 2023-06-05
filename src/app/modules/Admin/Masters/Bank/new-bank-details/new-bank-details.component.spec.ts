import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBankDetailsComponent } from './new-bank-details.component';

describe('NewBankDetailsComponent', () => {
  let component: NewBankDetailsComponent;
  let fixture: ComponentFixture<NewBankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBankDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
