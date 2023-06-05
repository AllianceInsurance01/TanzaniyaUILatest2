import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSectionDetailsComponent } from './new-section-details.component';

describe('NewSectionDetailsComponent', () => {
  let component: NewSectionDetailsComponent;
  let fixture: ComponentFixture<NewSectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSectionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
