import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBranchListComponent } from './user-branch-list.component';

describe('UserBranchListComponent', () => {
  let component: UserBranchListComponent;
  let fixture: ComponentFixture<UserBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBranchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
