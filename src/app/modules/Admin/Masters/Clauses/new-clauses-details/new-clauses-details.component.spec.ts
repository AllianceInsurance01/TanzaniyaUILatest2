import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClausesDetailsComponent } from './new-clauses-details.component';

describe('NewClausesDetailsComponent', () => {
  let component: NewClausesDetailsComponent;
  let fixture: ComponentFixture<NewClausesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClausesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClausesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
