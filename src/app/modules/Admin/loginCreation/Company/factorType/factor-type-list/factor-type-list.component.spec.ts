import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorTypeListComponent } from './factor-type-list.component';

describe('FactorTypeListComponent', () => {
  let component: FactorTypeListComponent;
  let fixture: ComponentFixture<FactorTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
