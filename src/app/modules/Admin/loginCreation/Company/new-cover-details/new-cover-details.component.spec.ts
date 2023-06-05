import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoverDetailsComponent } from './new-cover-details.component';

describe('NewCoverDetailsComponent', () => {
  let component: NewCoverDetailsComponent;
  let fixture: ComponentFixture<NewCoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
