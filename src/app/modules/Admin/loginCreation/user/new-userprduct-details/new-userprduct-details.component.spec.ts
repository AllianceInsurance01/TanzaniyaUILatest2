import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserprductDetailsComponent } from './new-userprduct-details.component';

describe('NewUserprductDetailsComponent', () => {
  let component: NewUserprductDetailsComponent;
  let fixture: ComponentFixture<NewUserprductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserprductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserprductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
