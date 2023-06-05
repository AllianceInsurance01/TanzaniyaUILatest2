import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiListComponent } from './emi-list.component';

describe('EmiListComponent', () => {
  let component: EmiListComponent;
  let fixture: ComponentFixture<EmiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
