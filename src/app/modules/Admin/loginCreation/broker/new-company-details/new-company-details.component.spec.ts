import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyDetailsComponent } from './new-company-details.component';

describe('NewCompanyDetailsComponent', () => {
  let component: NewCompanyDetailsComponent;
  let fixture: ComponentFixture<NewCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
