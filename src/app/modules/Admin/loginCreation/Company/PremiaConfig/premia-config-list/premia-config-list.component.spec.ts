import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiaConfigListComponent } from './premia-config-list.component';

describe('PremiaConfigListComponent', () => {
  let component: PremiaConfigListComponent;
  let fixture: ComponentFixture<PremiaConfigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiaConfigListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiaConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
