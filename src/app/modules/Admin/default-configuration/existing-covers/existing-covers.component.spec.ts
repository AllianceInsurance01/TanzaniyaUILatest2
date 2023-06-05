import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingCoversComponent } from './existing-covers.component';

describe('ExistingCoversComponent', () => {
  let component: ExistingCoversComponent;
  let fixture: ComponentFixture<ExistingCoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingCoversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingCoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
