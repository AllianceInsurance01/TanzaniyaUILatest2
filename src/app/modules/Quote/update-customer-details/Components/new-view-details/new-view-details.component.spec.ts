import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewViewDetailsComponent } from './new-view-details.component';

describe('NewViewDetailsComponent', () => {
  let component: NewViewDetailsComponent;
  let fixture: ComponentFixture<NewViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
