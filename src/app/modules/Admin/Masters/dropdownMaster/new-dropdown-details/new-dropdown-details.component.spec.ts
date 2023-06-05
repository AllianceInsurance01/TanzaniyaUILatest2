import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDropdownDetailsComponent } from './new-dropdown-details.component';

describe('NewDropdownDetailsComponent', () => {
  let component: NewDropdownDetailsComponent;
  let fixture: ComponentFixture<NewDropdownDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDropdownDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDropdownDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
