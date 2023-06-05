import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiaConfigDetailsComponent } from './premia-config-details.component';

describe('PremiaConfigDetailsComponent', () => {
  let component: PremiaConfigDetailsComponent;
  let fixture: ComponentFixture<PremiaConfigDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiaConfigDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiaConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
