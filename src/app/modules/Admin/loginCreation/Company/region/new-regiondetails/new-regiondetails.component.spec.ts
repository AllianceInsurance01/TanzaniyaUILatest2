import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegiondetailsComponent } from './new-regiondetails.component';

describe('NewRegiondetailsComponent', () => {
  let component: NewRegiondetailsComponent;
  let fixture: ComponentFixture<NewRegiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegiondetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
