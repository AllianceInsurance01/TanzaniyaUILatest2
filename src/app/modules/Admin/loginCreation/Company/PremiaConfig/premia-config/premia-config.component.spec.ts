import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiaConfigComponent } from './premia-config.component';

describe('PremiaConfigComponent', () => {
  let component: PremiaConfigComponent;
  let fixture: ComponentFixture<PremiaConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiaConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
