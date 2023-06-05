import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserbranchDetailsComponent } from './new-userbranch-details.component';

describe('NewUserbranchDetailsComponent', () => {
  let component: NewUserbranchDetailsComponent;
  let fixture: ComponentFixture<NewUserbranchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserbranchDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserbranchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
