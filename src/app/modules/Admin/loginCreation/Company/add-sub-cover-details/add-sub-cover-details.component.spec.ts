import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCoverDetailsComponent } from './add-sub-cover-details.component';

describe('AddSubCoverDetailsComponent', () => {
  let component: AddSubCoverDetailsComponent;
  let fixture: ComponentFixture<AddSubCoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubCoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubCoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
