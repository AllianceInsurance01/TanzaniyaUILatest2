import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmidetailsComponent } from './new-emidetails.component';

describe('NewEmidetailsComponent', () => {
  let component: NewEmidetailsComponent;
  let fixture: ComponentFixture<NewEmidetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmidetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
