import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExisitingDropdownsComponent } from './exisiting-dropdowns.component';

describe('ExisitingDropdownsComponent', () => {
  let component: ExisitingDropdownsComponent;
  let fixture: ComponentFixture<ExisitingDropdownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExisitingDropdownsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExisitingDropdownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
