import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionDetailsComponent } from './add-section-details.component';

describe('AddSectionDetailsComponent', () => {
  let component: AddSectionDetailsComponent;
  let fixture: ComponentFixture<AddSectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSectionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
