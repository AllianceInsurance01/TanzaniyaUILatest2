import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiaConfigDatalistComponent } from './premia-config-datalist.component';

describe('PremiaConfigDatalistComponent', () => {
  let component: PremiaConfigDatalistComponent;
  let fixture: ComponentFixture<PremiaConfigDatalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiaConfigDatalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiaConfigDatalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
