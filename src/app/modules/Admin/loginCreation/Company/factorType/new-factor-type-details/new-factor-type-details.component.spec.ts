import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFactorTypeDetailsComponent } from './new-factor-type-details.component';

describe('NewFactorTypeDetailsComponent', () => {
  let component: NewFactorTypeDetailsComponent;
  let fixture: ComponentFixture<NewFactorTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFactorTypeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFactorTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
