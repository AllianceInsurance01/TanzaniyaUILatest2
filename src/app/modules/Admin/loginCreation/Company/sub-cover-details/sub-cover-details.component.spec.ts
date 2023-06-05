import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCoverDetailsComponent } from './sub-cover-details.component';

describe('SubCoverDetailsComponent', () => {
  let component: SubCoverDetailsComponent;
  let fixture: ComponentFixture<SubCoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
