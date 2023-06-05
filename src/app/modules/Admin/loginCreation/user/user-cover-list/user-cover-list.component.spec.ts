import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoverListComponent } from './user-cover-list.component';

describe('UserCoverListComponent', () => {
  let component: UserCoverListComponent;
  let fixture: ComponentFixture<UserCoverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCoverListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
