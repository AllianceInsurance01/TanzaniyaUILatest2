import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubCoverDetailsComponent } from './new-sub-cover-details.component';

describe('NewSubCoverDetailsComponent', () => {
  let component: NewSubCoverDetailsComponent;
  let fixture: ComponentFixture<NewSubCoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubCoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubCoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
