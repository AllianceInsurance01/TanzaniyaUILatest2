import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingSectionComponent } from './existing-section.component';

describe('ExistingSectionComponent', () => {
  let component: ExistingSectionComponent;
  let fixture: ComponentFixture<ExistingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
