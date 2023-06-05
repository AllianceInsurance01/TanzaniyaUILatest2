import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarrantyDerailsComponent } from './add-warranty-derails.component';

describe('AddWarrantyDerailsComponent', () => {
  let component: AddWarrantyDerailsComponent;
  let fixture: ComponentFixture<AddWarrantyDerailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWarrantyDerailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWarrantyDerailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
