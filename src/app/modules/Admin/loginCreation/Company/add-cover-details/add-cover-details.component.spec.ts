import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoverDetailsComponent } from './add-cover-details.component';

describe('AddCoverDetailsComponent', () => {
  let component: AddCoverDetailsComponent;
  let fixture: ComponentFixture<AddCoverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
