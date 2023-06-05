import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductDetailsComponent } from './addproduct-details.component';

describe('AddproductDetailsComponent', () => {
  let component: AddproductDetailsComponent;
  let fixture: ComponentFixture<AddproductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
