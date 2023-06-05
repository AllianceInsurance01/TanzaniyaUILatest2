import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBranchDetailsComponent } from './new-branch-details.component';

describe('NewBranchDetailsComponent', () => {
  let component: NewBranchDetailsComponent;
  let fixture: ComponentFixture<NewBranchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBranchDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBranchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
