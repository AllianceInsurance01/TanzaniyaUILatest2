import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWarrantyDetailsComponent } from './new-warranty-details.component';

describe('NewWarrantyDetailsComponent', () => {
  let component: NewWarrantyDetailsComponent;
  let fixture: ComponentFixture<NewWarrantyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWarrantyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWarrantyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
