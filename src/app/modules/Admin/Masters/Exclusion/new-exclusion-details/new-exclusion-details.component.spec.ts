import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExclusionDetailsComponent } from './new-exclusion-details.component';

describe('NewExclusionDetailsComponent', () => {
  let component: NewExclusionDetailsComponent;
  let fixture: ComponentFixture<NewExclusionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExclusionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExclusionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
