import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClausesListComponent } from './clauses-list.component';

describe('ClausesListComponent', () => {
  let component: ClausesListComponent;
  let fixture: ComponentFixture<ClausesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClausesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClausesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
